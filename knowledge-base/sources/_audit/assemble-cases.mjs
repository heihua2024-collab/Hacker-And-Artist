#!/usr/bin/env node
// 拼装 cases.ts
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const ROOT = path.resolve(
  path.dirname(new URL(import.meta.url).pathname).replace(/^\//, ""),
  "../../..",
);
const SNIPPETS_DIR = path.join(ROOT, "knowledge-base/sources/cases");
const CASES_TS = path.join(ROOT, "src/lib/data/cases.ts");
const REPORT_PATH = path.join(
  ROOT,
  "knowledge-base/sources/_audit/assemble-cases-report.md",
);

// 同物合并：snippet slug → existing slug
const MERGE_TO_EXISTING = {
  "mip-splatting": "mip-splatting-anti-aliased",
  sugar: "sugar-surface-aligned-meshes",
};

const VALID_TAGS = new Set([
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

function parseSnippet(content) {
  const trimmed = content.trim().replace(/,\s*$/, "");
  return vm.runInNewContext(`(${trimmed})`);
}

function fixZhBackticks(str) {
  if (typeof str !== "string") return str;
  return str.replace(/`([^`]+)`/g, "「$1」");
}

function cleanBilingual(b) {
  if (!b) return b;
  return {
    zh: typeof b.zh === "string" ? fixZhBackticks(b.zh) : b.zh,
    en: b.en,
  };
}

function cleanQuote(q) {
  if (!q) return q;
  return {
    zh: typeof q.zh === "string" ? fixZhBackticks(q.zh) : q.zh,
    en: q.en,
  };
}

function cleanCase(s) {
  return {
    ...s,
    title: cleanBilingual(s.title),
    summary: cleanBilingual(s.summary),
    description: cleanBilingual(s.description),
    lessons: Array.isArray(s.lessons) ? s.lessons.map(cleanBilingual) : [],
    quote: cleanQuote(s.quote),
    tags: Array.isArray(s.tags) ? s.tags.filter((t) => VALID_TAGS.has(t)) : [],
  };
}

function loadSnippets() {
  const files = fs
    .readdirSync(SNIPPETS_DIR)
    .filter((f) => f.endsWith(".ts.snippet"))
    .sort();
  const list = [];
  for (const f of files) {
    const content = fs.readFileSync(path.join(SNIPPETS_DIR, f), "utf8");
    const obj = parseSnippet(content);
    list.push({ file: f, obj: cleanCase(obj) });
  }
  return list;
}

function parseExistingCases(content) {
  const startMarker = "export const cases: CaseEntry[] = [";
  const endMarker = "\n];";
  const startIdx = content.indexOf(startMarker);
  if (startIdx < 0) throw new Error("未找到 cases 数组");
  const arrayStart = startIdx + startMarker.length;
  const afterArray = content.indexOf(endMarker, arrayStart);
  const arrayContent = content.slice(arrayStart, afterArray);
  const arr = vm.runInNewContext(`[${arrayContent}]`);
  return {
    arr,
    header: content.slice(0, startIdx),
    footer: content.slice(afterArray + endMarker.length),
  };
}

function mergeQuote(existing, snippet) {
  // 仅当现有 quote 缺失或为空时，用 snippet 的补充
  if (!existing.quote || (!existing.quote.zh && !existing.quote.en)) {
    if (snippet.quote && (snippet.quote.zh || snippet.quote.en)) {
      return { ...existing, quote: snippet.quote };
    }
  }
  return existing;
}

function mergeSources(existing, snippet) {
  const set = new Set([...(existing.sources || []), ...(snippet.sources || [])]);
  return { ...existing, sources: Array.from(set) };
}

function upgradeExisting(existing, snippet) {
  let merged = { ...existing };
  merged = mergeQuote(merged, snippet);
  merged = mergeSources(merged, snippet);
  return merged;
}

// ============ 序列化 ============
function serializeValue(v, indent = 4) {
  const pad = " ".repeat(indent);
  const padLess = " ".repeat(Math.max(0, indent - 2));
  if (v === null) return "null";
  if (v === undefined) return "undefined";
  if (typeof v === "boolean") return String(v);
  if (typeof v === "number") return String(v);
  if (typeof v === "string") return JSON.stringify(v);
  if (Array.isArray(v)) {
    if (v.length === 0) return "[]";
    const items = v.map((item) => `${pad}${serializeValue(item, indent + 2)}`);
    return `[\n${items.join(",\n")},\n${padLess}]`;
  }
  if (typeof v === "object") {
    const entries = Object.entries(v);
    if (entries.length === 0) return "{}";
    const lines = entries.map(([k, val]) => {
      const key = /^[a-zA-Z_$][\w$]*$/.test(k) ? k : JSON.stringify(k);
      return `${pad}${key}: ${serializeValue(val, indent + 2)}`;
    });
    return `{\n${lines.join(",\n")},\n${padLess}}`;
  }
  return JSON.stringify(v);
}

function main() {
  const snippets = loadSnippets();
  console.log(`已加载 cases snippet: ${snippets.length}`);

  const content = fs.readFileSync(CASES_TS, "utf8");
  const { arr: existing, header, footer } = parseExistingCases(content);
  console.log(`已加载现有 cases.ts: ${existing.length}`);

  const existingBySlug = new Map(existing.map((e) => [e.slug, e]));
  const merged = [];
  const newEntries = [];

  for (const { file, obj } of snippets) {
    const slug = obj.slug;
    if (MERGE_TO_EXISTING[slug]) {
      const target = MERGE_TO_EXISTING[slug];
      const cur = existingBySlug.get(target);
      if (cur) {
        existingBySlug.set(target, upgradeExisting(cur, obj));
        merged.push({ from: slug, to: target });
        continue;
      }
    }
    if (existingBySlug.has(slug)) {
      existingBySlug.set(slug, upgradeExisting(existingBySlug.get(slug), obj));
      merged.push({ from: slug, to: slug });
      continue;
    }
    newEntries.push(obj);
  }

  const upgradedExisting = existing.map((e) => existingBySlug.get(e.slug) || e);
  const finalCases = [...upgradedExisting, ...newEntries];

  const serialized = finalCases
    .map((c) => serializeValue(c, 4))
    .join(",\n  ");
  const newCasesTs = `${header}export const cases: CaseEntry[] = [\n  ${serialized},\n];${footer}`;
  fs.writeFileSync(CASES_TS, newCasesTs, "utf8");

  const report = `# cases.ts 拼装报告（${new Date().toISOString().slice(0, 10)}）

## 摘要
- snippet 总数：${snippets.length}
- 现有：${existing.length}
- 同物合并：${merged.length} 条 → ${merged.map((m) => `${m.from}→${m.to}`).join(", ")}
- 新增：${newEntries.length}
- **最终 cases.ts**：${finalCases.length}

## 新增条目
${newEntries.map((e) => `- ${e.slug} | ${e.year} | ${e.publishedAt}`).join("\n")}
`;
  fs.writeFileSync(REPORT_PATH, report, "utf8");
  console.log(`done. 总条目: ${finalCases.length}`);
}

main();
