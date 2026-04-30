import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toolsDir = path.join(__dirname, "../tools");

const existingSlugs = new Set([
  "polycam",
  "luma-ai",
  "scaniverse",
  "kiri-engine",
  "inria-gaussian-splatting",
  "gsplat",
  "postshot",
  "supersplat",
  "spline",
  "playcanvas-editor",
  "blender-3dgs-addon",
  "luma-web-library",
  "three-gaussian-splatting",
  "antimatter15-splat",
  "babylonjs-splat",
  "luma-web-platform",
  "scaniverse-cloud",
  "polycam-explore",
]);

const tagIds = new Set([
  "capture",
  "training",
  "editing",
  "viewing",
  "publishing",
  "web_rendering",
  "slam",
  "spatial_media",
  "paper",
  "case_study",
  "interview",
  "tutorial",
  "real_time",
  "optimization",
  "generation",
  "dynamic",
  "avatar",
  "semantic",
  "surface",
  "compression",
  "reconstruction",
  "dataset",
  "cultural_heritage",
  "indoor",
  "outdoor",
]);
const levelIds = new Set(["beginner", "intermediate", "expert"]);
const spaceTypeIds = new Set([
  "heritage",
  "art_gallery",
  "medical_aesthetics",
  "retail",
  "indoor_living",
  "urban_outdoor",
  "natural_landscape",
]);
const categoryIds = new Set([
  "capture",
  "training",
  "editing",
  "viewing",
  "publishing",
]);
const pricingIds = new Set([
  "free",
  "freemium",
  "subscription",
  "one-time",
  "enterprise",
]);
const platformIds = new Set([
  "iOS",
  "Android",
  "Web",
  "Windows",
  "macOS",
  "Linux",
]);
const regionIds = new Set([
  "global",
  "china",
  "japan",
  "korea",
  "europe",
  "north-america",
  "other",
]);
const discoveryIds = new Set([
  "radiance-fields",
  "supersplat",
  "reddit",
  "x-twitter",
  "china-zone",
  "japan-korea-zone",
  "user-feedback",
  "user-workflow",
  "manual",
]);

function normalizeSlug(s) {
  return s.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function findSuspect(slug, existing) {
  const n = normalizeSlug(slug);
  for (const e of existing) {
    if (e === slug) continue;
    const ne = normalizeSlug(e);
    if (n === ne) return e;
    const minL = Math.min(n.length, ne.length);
    if (minL >= 5 && (n.includes(ne) || ne.includes(n)) && Math.abs(n.length - ne.length) <= 3)
      return e;
  }
  return null;
}

const miscatSlugs = new Set([
  "ply-format",
  "spz-format",
  "3dgs-mcmc",
  "niantic-spz-reference",
]);

function isMiscat(slug) {
  if (miscatSlugs.has(slug)) return true;
  if (/-format$/.test(slug) && !slug.includes("transform")) return true;
  return false;
}

const dropKnown = new Set(["glassbox-rs", "spatialux", "splatical"]);

/** Forbidden inside Chinese zh string content: " ' ` \ ${ */
function scanZhStringViolations(zhContent, lineStart) {
  const violations = [];
  if (!zhContent) return violations;
  // Check each forbidden char when surrounded by or near CJK
  const hasCjk = /[\u4e00-\u9fff]/.test(zhContent);
  if (!hasCjk) return violations;

  const patterns = [
    { name: "double-quote", re: /"/g },
    { name: "single-quote", re: /'/g },
    { name: "backtick", re: /`/g },
    { name: "backslash", re: /\\/g },
    { name: "dollar-brace", re: /\$\{/g },
  ];
  for (const { name, re } of patterns) {
    let m;
    const r = new RegExp(re.source, re.flags.includes("g") ? re.flags : re.flags + "g");
    while ((m = r.exec(zhContent)) !== null) {
      violations.push({ char: name, offset: m.index, line: lineStart });
    }
  }
  return violations;
}

/** Extract zh: "..." or zh: `...` values with approximate line numbers */
function extractZhSegments(raw) {
  const lines = raw.split(/\r?\n/);
  const segments = [];
  for (let li = 0; li < lines.length; li++) {
    const line = lines[li];
    // Bilingual blocks: zh: "..."  (single line typical)
    let mm;
    const re1 = /\bzh:\s*"((?:[^"\\]|\\.)*)"/g;
    while ((mm = re1.exec(line)) !== null) {
      segments.push({ text: mm[1].replace(/\\"/g, '"'), line: li + 1 });
    }
    const re2 = /\bzh:\s*`([^`]*)`/g;
    while ((mm = re2.exec(line)) !== null) {
      segments.push({ text: mm[1], line: li + 1 });
    }
  }
  return segments;
}

function countSourcesArray(raw) {
  const idx = raw.indexOf("sources:");
  if (idx === -1) return 0;
  let depth = 0;
  let start = -1;
  for (let i = idx; i < raw.length; i++) {
    const c = raw[i];
    if (c === "[") {
      if (depth === 0) start = i;
      depth++;
    } else if (c === "]") {
      depth--;
      if (depth === 0 && start !== -1) {
        const inner = raw.slice(start + 1, i);
        const strings = inner.match(/"[^"]*"/g) || [];
        return strings.filter((s) => s.length > 2).length;
      }
    }
  }
  return 0;
}

const files = fs.readdirSync(toolsDir).filter((f) => f.endsWith(".ts.snippet"));

const results = [];

for (const f of files.sort()) {
  const p = path.join(toolsDir, f);
  const raw = fs.readFileSync(p, "utf8");
  const slugM = raw.match(/slug:\s*["']([^"']+)["']/);
  const slug = slugM ? slugM[1] : f.replace(".ts.snippet", "");

  let dupStatus = "NEW";
  if (existingSlugs.has(slug)) dupStatus = "DUPLICATE_OVERWRITE";
  else {
    const sus = findSuspect(slug, existingSlugs);
    if (sus) dupStatus = `SUSPECT_DUPLICATE(${sus})`;
  }

  const miscat = isMiscat(slug) ? "MISCATEGORIZED_TO_GLOSSARY" : "";

  const verM = raw.match(/verified:\s*(true|false)/);
  const verified = verM && verM[1] === "true";
  const homeM = raw.match(/homepageUrl:\s*["']([^"']*)["']/);
  const homepage = homeM ? homeM[1] : "";
  const placeholder =
    /example\.com|placeholder|localhost|127\.0\.0\.1|^https?:\/\/$|^$/.test(
      homepage,
    ) || homepage === "https://";
  let drop = "";
  if (dropKnown.has(slug)) drop = "DROP_CANDIDATE";
  else if (!verified && placeholder) drop = "DROP_CANDIDATE";

  const tagM = raw.match(/tags:\s*\[([\s\S]*?)\]\s*,/);
  const tagStr = tagM ? tagM[1] : "";
  const tagList = [...tagStr.matchAll(/["']([^"']+)["']/g)].map((m) => m[1]);
  const badTags = tagList.filter((t) => !tagIds.has(t));

  const levelM = raw.match(/level:\s*["']([^"']+)["']/);
  const level = levelM ? levelM[1] : "";
  const badLevel = level && !levelIds.has(level);

  const useM = raw.match(/useCases:\s*\[([\s\S]*?)\]\s*,/);
  const useStr = useM ? useM[1] : "";
  const useList = [...useStr.matchAll(/["']([^"']+)["']/g)].map((m) => m[1]);
  const badUse = useList.filter((u) => !spaceTypeIds.has(u));

  const catM = raw.match(/category:\s*["']([^"']+)["']/);
  const cat = catM ? catM[1] : "";
  const badCat = cat && !categoryIds.has(cat);

  const priceM = raw.match(/pricing:\s*["']([^"']+)["']/);
  const pricing = priceM ? priceM[1] : "";
  const badPrice = pricing && !pricingIds.has(pricing);

  const platM = raw.match(/platforms:\s*\[([\s\S]*?)\]\s*,/);
  const platStr = platM ? platM[1] : "";
  const platList = [...platStr.matchAll(/["']([^"']+)["']/g)].map((m) => m[1]);
  const badPlat = platList.filter((x) => !platformIds.has(x));

  const regM = raw.match(/region:\s*["']([^"']+)["']/);
  const region = regM ? regM[1] : "";
  const badRegion = region && !regionIds.has(region);

  const discM = raw.match(/discoverySource:\s*["']([^"']+)["']/);
  const disc = discM ? discM[1] : "";
  const badDisc = disc && !discoveryIds.has(disc);

  const fieldIssues = [];
  if (badTags.length)
    fieldIssues.push(`tags invalid: ${JSON.stringify(badTags)}`);
  if (badLevel) fieldIssues.push(`level invalid: ${badLevel}`);
  if (badUse.length)
    fieldIssues.push(`useCases invalid: ${JSON.stringify(badUse)}`);
  if (badCat) fieldIssues.push(`category invalid: ${badCat}`);
  if (badPrice) fieldIssues.push(`pricing invalid: ${pricing}`);
  if (badPlat.length)
    fieldIssues.push(`platforms invalid: ${JSON.stringify(badPlat)}`);
  if (badRegion) fieldIssues.push(`region invalid: ${region}`);
  if (badDisc) fieldIssues.push(`discoverySource invalid: ${disc}`);

  const srcCount = countSourcesArray(raw);
  const weakSrc = srcCount < 2;

  const hasEvidence =
    /evidenceQuote:\s*["'`][^"'`]{8,}/.test(raw) ||
    /evidenceQuote:\s*\n\s*["'`]/.test(raw);

  const zhSegs = extractZhSegments(raw);
  const strViol = [];
  for (const seg of zhSegs) {
    const v = scanZhStringViolations(seg.text, seg.line);
    for (const x of v) strViol.push({ ...x, line: seg.line });
  }

  results.push({
    file: f,
    slug,
    dupStatus,
    miscat,
    drop,
    fieldIssues,
    weakSrc,
    srcCount,
    hasEvidence,
    strViol,
  });
}

fs.writeFileSync(
  path.join(__dirname, "_tools-audit-raw.json"),
  JSON.stringify(results, null, 2),
  "utf8",
);
console.log("Wrote _tools-audit-raw.json, entries:", results.length);
