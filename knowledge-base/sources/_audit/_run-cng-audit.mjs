import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const repoRoot = path.join(__dirname, "..", "..", "..");

const tagIds = new Set([
  "capture", "training", "editing", "viewing", "publishing", "web_rendering",
  "slam", "spatial_media", "paper", "case_study", "interview", "tutorial",
  "real_time", "optimization", "generation", "dynamic", "avatar", "semantic",
  "surface", "compression", "reconstruction", "dataset", "cultural_heritage",
  "indoor", "outdoor",
]);
const levelIds = new Set(["beginner", "intermediate", "expert"]);
const spaceTypeIds = new Set([
  "heritage", "art_gallery", "medical_aesthetics", "retail", "indoor_living",
  "urban_outdoor", "natural_landscape",
]);
const creatorRoleIds = new Set([
  "developer", "researcher", "3d_artist", "curator", "spatial_designer",
  "videographer", "technical_writer",
]);
const sourceTypeIds = new Set([
  "arxiv", "github", "x", "zhihu", "bilibili", "youtube", "official_website",
  "media",
]);
const glossaryLinkTypes = new Set([...sourceTypeIds, "paper"]);
const newsCategories = new Set(["paper", "tool", "industry", "community", "art"]);
const glossaryCategories = new Set([
  "concept", "technique", "format", "tool", "metric", "workflow",
]);
const caseKinds = new Set(["milestone", "production"]);

const existingCases = new Set([
  "inria-original-3dgs",
  "sugar-surface-aligned-meshes",
  "playcanvas-supersplat-editor",
  "mip-splatting-anti-aliased",
]);

const newsTs = fs.readFileSync(
  path.join(repoRoot, "src/lib/data/news.ts"),
  "utf8",
);
const existingNews = new Set(
  [...newsTs.matchAll(/^\s+id:\s*"([^"]+)"/gm)]
    .map((m) => m[1])
    .filter((id) => /^[a-z0-9-]+$/.test(id)),
);

const glossaryTs = fs.readFileSync(
  path.join(repoRoot, "src/lib/data/glossary.ts"),
  "utf8",
);
const existingGlossary = new Set(
  [...glossaryTs.matchAll(/^\s+id:\s*"([^"]+)"/gm)]
    .map((m) => m[1])
    .filter((id) => /^[a-z0-9-]+$/.test(id)),
);

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
    if (minL >= 5 && (n.includes(ne) || ne.includes(n)) && Math.abs(n.length - ne.length) <= 4)
      return e;
  }
  return null;
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

function scanZhViolations(zhContent) {
  const violations = [];
  if (!zhContent || !/[\u4e00-\u9fff]/.test(zhContent)) return violations;
  const patterns = [
    { name: "double-quote", re: /"/g },
    { name: "single-quote", re: /'/g },
    { name: "backtick", re: /`/g },
    { name: "backslash", re: /\\/g },
    { name: "dollar-brace", re: /\$\{/g },
  ];
  for (const { name, re } of patterns) {
    let m;
    const r = new RegExp(re.source, "g");
    while ((m = r.exec(zhContent)) !== null) {
      violations.push({ char: name, offset: m.index });
    }
  }
  return violations;
}

function extractZhSegments(raw) {
  const lines = raw.split(/\r?\n/);
  const segments = [];
  for (let li = 0; li < lines.length; li++) {
    const line = lines[li];
    const re1 = /\bzh:\s*"((?:[^"\\]|\\.)*)"/g;
    let mm;
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

function auditFile(raw, kind) {
  const slugM =
    kind === "news" || kind === "glossary"
      ? raw.match(/(?:^|\n)\s*(?:slug|id):\s*["']([^"']+)["']/)
      : raw.match(/slug:\s*["']([^"']+)["']/);
  const key =
    slugM?.[1] ||
    (kind === "news" ? raw.match(/id:\s*["']([^"']+)["']/)?.[1] : null) ||
    slugM?.[1];

  const verM = raw.match(/verified:\s*(true|false)/);
  const verified = verM && verM[1] === "true";

  let homepageLike = "";
  if (kind === "news") {
    const u = raw.match(/sourceUrl:\s*["']([^"']*)["']/);
    homepageLike = u ? u[1] : "";
  }

  const placeholder =
    /example\.com|placeholder|localhost|^https?:\/\/$|^$/.test(homepageLike);

  let drop = "";
  if (!verified && placeholder && kind === "news") drop = "DROP_CANDIDATE";
  if (!verified && raw.includes("homepageUrl:")) {
    const h = raw.match(/homepageUrl:\s*["']?([^"'\n,}]*)["']?/);
    const hv = h ? h[1].trim() : "";
    if (
      /example\.com|placeholder|null|^$/.test(hv) ||
      hv === "https://" ||
      hv === '""'
    )
      if (!verified) drop = "DROP_CANDIDATE";
  }

  const tagM = raw.match(/tags:\s*\[([\s\S]*?)\]\s*,/);
  const tagStr = tagM ? tagM[1] : "";
  const tagList = [...tagStr.matchAll(/["']([^"']+)["']/g)].map((m) => m[1]);
  const badTags = tagList.filter((t) => !tagIds.has(t));

  const relTagM = raw.match(/relatedTagIds:\s*\[([\s\S]*?)\]\s*,/);
  const relStr = relTagM ? relTagM[1] : "";
  const relList = [...relStr.matchAll(/["']([^"']+)["']/g)].map((m) => m[1]);
  const badRelTags = relList.filter((t) => !tagIds.has(t));

  const levelM = raw.match(/level:\s*["']([^"']+)["']/);
  const level = levelM ? levelM[1] : "";
  const badLevel = level && !levelIds.has(level);

  const useM = raw.match(/spaceType:\s*["']([^"']+)["']/);
  const st = useM ? useM[1] : raw.match(/spaceType:\s*null/) ? "null" : "";
  const badSpace =
    st &&
    st !== "null" &&
    !spaceTypeIds.has(st);

  const catM = raw.match(/category:\s*["']([^"']+)["']/);
  const cat = catM ? catM[1] : "";
  let badCat = "";
  if (kind === "news" && cat && !newsCategories.has(cat))
    badCat = cat;
  if (kind === "glossary" && cat && !glossaryCategories.has(cat))
    badCat = cat;

  const kindM = raw.match(/kind:\s*["']([^"']+)["']/);
  const ckind = kindM ? kindM[1] : "";
  const badKind = ckind && !caseKinds.has(ckind);

  const srcTypeM = raw.match(/type:\s*["']([^"']+)["']/g);
  let badLinkTypes = [];
  if (kind === "glossary") {
    const linkBlocks = raw.matchAll(/links:\s*\[([\s\S]*?)\]\s*,/g);
    for (const lb of linkBlocks) {
      const inner = lb[1];
      const types = [...inner.matchAll(/type:\s*["']([^"']+)["']/g)].map(
        (m) => m[1],
      );
      badLinkTypes = types.filter((t) => !glossaryLinkTypes.has(t));
    }
  }

  const newsSourceTypeM = raw.match(
    /source:\s*\{[^}]*type:\s*["']([^"']+)["']/,
  );
  const nst = newsSourceTypeM ? newsSourceTypeM[1] : "";
  const badNewsSrc = kind === "news" && nst && !sourceTypeIds.has(nst);

  let badCreatorRoles = [];
  if (kind === "cases") {
    const roles = [...raw.matchAll(/role:\s*["']([^"']+)["']/g)].map(
      (m) => m[1],
    );
    badCreatorRoles = [...new Set(roles.filter((r) => !creatorRoleIds.has(r)))];
  }

  const fieldIssues = [];
  if (badTags.length) fieldIssues.push(`tags: ${JSON.stringify(badTags)}`);
  if (badRelTags.length)
    fieldIssues.push(`relatedTagIds: ${JSON.stringify(badRelTags)}`);
  if (badLevel) fieldIssues.push(`level: ${badLevel}`);
  if (badSpace) fieldIssues.push(`spaceType: ${st}`);
  if (badCat) fieldIssues.push(`category: ${badCat}`);
  if (badKind) fieldIssues.push(`kind: ${ckind}`);
  if (badLinkTypes.length)
    fieldIssues.push(`link types: ${JSON.stringify(badLinkTypes)}`);
  if (badNewsSrc) fieldIssues.push(`source.type: ${nst}`);
  if (badCreatorRoles.length)
    fieldIssues.push(`creator.role: ${JSON.stringify(badCreatorRoles)}`);

  const srcCount = countSourcesArray(raw);
  const weakSrc = srcCount < 2;

  const zhSegs = extractZhSegments(raw);
  const strViol = [];
  for (const seg of zhSegs) {
    const v = scanZhViolations(seg.text);
    for (const x of v) strViol.push({ ...x, line: seg.line });
  }

  let hasQuote = true;
  if (kind === "cases") {
    hasQuote =
      /quote:\s*\{/.test(raw) &&
      (/quote:\s*\{[^}]*zh:\s*"[^"]{3,}/s.test(raw) ||
        /quote:\s*\{[^}]*en:\s*"[^"]{10,}/s.test(raw));
  }

  return {
    key,
    verified,
    drop,
    fieldIssues,
    weakSrc,
    srcCount,
    strViol,
    hasQuote,
  };
}

function runBatch(dir, kind, existingSet, idField) {
  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".ts.snippet"))
    .sort();
  const rows = [];
  for (const f of files) {
    const raw = fs.readFileSync(path.join(dir, f), "utf8");
    const base = auditFile(raw, kind);
    let key = base.key;
    if (!key) {
      const m = raw.match(new RegExp(`${idField}:\\s*["']([^"']+)["']`));
      key = m ? m[1] : f.replace(".ts.snippet", "");
    }

    let dupStatus = "NEW";
    if (existingSet.has(key)) dupStatus = "DUPLICATE_OVERWRITE";
    else {
      const sus = findSuspect(key, existingSet);
      if (sus) dupStatus = `SUSPECT_DUPLICATE(${sus})`;
    }

    rows.push({
      file: f,
      slug: key,
      dupStatus,
      ...base,
      missingQuote: kind === "cases" && !base.hasQuote,
    });
  }
  return rows;
}

const casesDir = path.join(root, "cases");
const newsDir = path.join(root, "news");
const glossDir = path.join(root, "glossary");

const casesRows = runBatch(casesDir, "cases", existingCases, "slug");
const newsRows = runBatch(newsDir, "news", existingNews, "id");
const glossRows = runBatch(glossDir, "glossary", existingGlossary, "id");

const out = { cases: casesRows, news: newsRows, glossary: glossRows };
fs.writeFileSync(
  path.join(__dirname, "_cng-audit-raw.json"),
  JSON.stringify(out, null, 2),
  "utf8",
);
console.log(
  JSON.stringify({
    cases: casesRows.length,
    news: newsRows.length,
    glossary: glossRows.length,
  }),
);
