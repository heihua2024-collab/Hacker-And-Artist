#!/usr/bin/env node
// 拼装 glossary.ts（第三批 25 条）
// _pending_glossary_from_tools 的 3 条暂不处理，留给第四批
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const ROOT = path.resolve(
  path.dirname(new URL(import.meta.url).pathname).replace(/^\//, ""),
  "../../..",
);
const SNIPPETS_DIR = path.join(ROOT, "knowledge-base/sources/glossary");
const GLOSSARY_TS = path.join(ROOT, "src/lib/data/glossary.ts");
const REPORT_PATH = path.join(
  ROOT,
  "knowledge-base/sources/_audit/assemble-glossary-report.md",
);

const VALID_TAGS = new Set([
  "capture", "training", "editing", "viewing", "publishing",
  "web_rendering", "slam", "spatial_media", "paper", "case_study",
  "interview", "tutorial", "real_time", "optimization", "generation",
  "dynamic", "avatar", "semantic", "surface", "compression",
  "reconstruction", "dataset", "cultural_heritage", "indoor", "outdoor",
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

function cleanEntry(s) {
  return {
    ...s,
    term: cleanBilingual(s.term),
    short: cleanBilingual(s.short),
    definition: cleanBilingual(s.definition),
    context: cleanBilingual(s.context),
    relatedTagIds: Array.isArray(s.relatedTagIds)
      ? s.relatedTagIds.filter((t) => VALID_TAGS.has(t))
      : [],
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
    list.push({ file: f, obj: cleanEntry(obj) });
  }
  return list;
}

function parseExistingGlossary(content) {
  const startMarker = "export const glossary: GlossaryEntry[] = [";
  const endMarker = "\n];";
  const startIdx = content.indexOf(startMarker);
  if (startIdx < 0) throw new Error("未找到 glossary 数组");
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

function upgradeExisting(existing, snippet) {
  const merged = { ...existing };
  // 仅追加现有缺失的字段
  const additionalKeys = [
    "short",
    "prerequisiteTerms",
    "advancedTerms",
    "introducedIn",
    "introducedBy",
    "introducedSourceUrl",
    "introducedQuoteEn",
    "relatedTools",
    "relatedEngines",
    "relatedPapers",
  ];
  for (const k of additionalKeys) {
    if (snippet[k] !== undefined && existing[k] === undefined) {
      merged[k] = snippet[k];
    }
  }
  // 合并 sources 去重
  const set = new Set([...(existing.sources || []), ...(snippet.sources || [])]);
  merged.sources = Array.from(set);
  return merged;
}

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
  console.log(`已加载 glossary snippet: ${snippets.length}`);

  const content = fs.readFileSync(GLOSSARY_TS, "utf8");
  const { arr: existing, header, footer } = parseExistingGlossary(content);
  console.log(`已加载现有 glossary.ts: ${existing.length}`);

  const existingById = new Map(existing.map((e) => [e.id, e]));
  const overwritten = [];
  const newEntries = [];

  for (const { file, obj } of snippets) {
    if (existingById.has(obj.id)) {
      existingById.set(obj.id, upgradeExisting(existingById.get(obj.id), obj));
      overwritten.push(obj.id);
    } else {
      newEntries.push(obj);
    }
  }

  const upgradedExisting = existing.map((e) => existingById.get(e.id) || e);
  const finalGlossary = [...upgradedExisting, ...newEntries];

  const serialized = finalGlossary
    .map((e) => serializeValue(e, 4))
    .join(",\n  ");
  const newGlossaryTs = `${header}export const glossary: GlossaryEntry[] = [\n  ${serialized},\n];${footer}`;
  fs.writeFileSync(GLOSSARY_TS, newGlossaryTs, "utf8");

  const report = `# glossary.ts 拼装报告（${new Date().toISOString().slice(0, 10)}）

## 摘要
- snippet 总数：${snippets.length}
- 现有：${existing.length}
- 同 id 升级：${overwritten.length} → ${overwritten.join(", ") || "(无)"}
- 新增：${newEntries.length}
- **最终 glossary.ts**：${finalGlossary.length}

## 新增条目
${newEntries.map((e) => `- ${e.id} | ${e.category} | ${e.level}`).join("\n")}

## 注
3 个 \`_pending_glossary_from_tools/\` 暂不处理（tool schema 写的需重构为 glossary schema），留给 glossary 第四批专项处理。
`;
  fs.writeFileSync(REPORT_PATH, report, "utf8");
  console.log(`done. 总条目: ${finalGlossary.length}`);
}

main();
