#!/usr/bin/env node
// 拼装 tools.ts 脚本
// 执行：node knowledge-base/sources/_audit/assemble-tools.mjs

import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname).replace(/^\//, ""), "../../..");
const SNIPPETS_DIR = path.join(ROOT, "knowledge-base/sources/tools");
const TOOLS_TS = path.join(ROOT, "src/lib/data/tools.ts");
const PENDING_GLOSSARY_DIR = path.join(ROOT, "knowledge-base/sources/_pending_glossary_from_tools");
const REPORT_PATH = path.join(ROOT, "knowledge-base/sources/_audit/assemble-report.md");

// ============ 决策清单 ============
const DROP = new Set(["glassbox-rs", "spatialux", "splatical"]);
const MIGRATE_TO_GLOSSARY = new Set(["3dgs-mcmc", "ply-format", "spz-format"]);
const MERGE_TO_EXISTING = {
  "threejs-gaussian-splatting": "antimatter15-splat",
  "gsplat-js": "three-gaussian-splatting",
};
const SAME_SLUG_OVERWRITE = new Set([
  "kiri-engine",
  "luma-ai",
  "polycam",
  "postshot",
  "scaniverse",
  "spline",
  "supersplat",
]);

// ============ 字段清洗 ============
const INVALID_TAGS = new Set([
  "mobile",
  "desktop",
  "web",
  "opensource",
  "commercial",
  "freemium",
]);

function parseSnippet(content) {
  const trimmed = content.trim().replace(/,\s*$/, "");
  return vm.runInNewContext(`(${trimmed})`);
}

function cleanTags(tags) {
  if (!Array.isArray(tags)) return [];
  return tags.filter((t) => !INVALID_TAGS.has(t));
}

function fixZhBackticks(str) {
  if (typeof str !== "string") return str;
  // 中文字符串里的反引号 → 全角直角引号
  return str.replace(/`([^`]+)`/g, "「$1」");
}

function cleanBilingual(b) {
  if (!b) return b;
  return {
    zh: typeof b.zh === "string" ? fixZhBackticks(b.zh) : b.zh,
    en: b.en,
  };
}

function cleanProsOrCons(arr) {
  if (!Array.isArray(arr)) return [];
  return arr.map(cleanBilingual);
}

function cleanSnippet(s) {
  return {
    ...s,
    tags: cleanTags(s.tags),
    tagline: cleanBilingual(s.tagline),
    description: cleanBilingual(s.description),
    pros: cleanProsOrCons(s.pros),
    cons: cleanProsOrCons(s.cons),
    priceNote:
      typeof s.priceNote === "string" ? fixZhBackticks(s.priceNote) : s.priceNote,
    freshnessSignal:
      typeof s.freshnessSignal === "string"
        ? fixZhBackticks(s.freshnessSignal)
        : s.freshnessSignal,
  };
}

// ============ 加载所有 snippet ============
function loadSnippets() {
  const files = fs
    .readdirSync(SNIPPETS_DIR)
    .filter((f) => f.endsWith(".ts.snippet"))
    .sort();
  const list = [];
  const errors = [];
  for (const f of files) {
    try {
      const content = fs.readFileSync(path.join(SNIPPETS_DIR, f), "utf8");
      const obj = parseSnippet(content);
      list.push({ file: f, obj: cleanSnippet(obj) });
    } catch (e) {
      errors.push({ file: f, error: e.message });
    }
  }
  return { list, errors };
}

// ============ 解析现有 tools.ts ============
// 提取 const tools: Tool[] = [ ... ] 中间的 18 个对象
function parseExistingTools(toolsTsContent) {
  const startMarker = "export const tools: Tool[] = [";
  const endMarker = "];";
  const startIdx = toolsTsContent.indexOf(startMarker);
  if (startIdx < 0) throw new Error("未找到 tools 数组起始标记");
  const arrayStart = startIdx + startMarker.length;
  // 找到对应的 ]; （最近的 export const 之前的 ];）
  const afterArray = toolsTsContent.indexOf("\n];", arrayStart);
  if (afterArray < 0) throw new Error("未找到 tools 数组结束标记");
  const arrayContent = toolsTsContent.slice(arrayStart, afterArray);
  // 用 vm 解析整个数组
  const arr = vm.runInNewContext(`[${arrayContent}]`);
  const header = toolsTsContent.slice(0, startIdx);
  const footer = toolsTsContent.slice(afterArray + 3);
  return { existingTools: arr, header, footer };
}

// ============ 升级 9 条覆盖（保留人写文案，仅追加扩展字段）============
function upgradeExisting(existing, snippet) {
  const merged = { ...existing };
  // 追加扩展字段（仅当现有没有时）
  const extKeys = [
    "vendor",
    "region",
    "evidenceQuote",
    "freshnessCheckedAt",
    "freshnessSignal",
    "discoverySource",
  ];
  for (const k of extKeys) {
    if (snippet[k] !== undefined && existing[k] === undefined) {
      merged[k] = snippet[k];
    }
  }
  // 更新 lastVerifiedAt（取较新者）
  if (snippet.lastVerifiedAt && (!existing.lastVerifiedAt || snippet.lastVerifiedAt > existing.lastVerifiedAt)) {
    merged.lastVerifiedAt = snippet.lastVerifiedAt;
  }
  // 合并 sources（去重保序）
  const srcSet = new Set([...(existing.sources || []), ...(snippet.sources || [])]);
  merged.sources = Array.from(srcSet);
  return merged;
}

// ============ 序列化对象为 TS 字面量字符串 ============
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

function serializeTool(tool) {
  return serializeValue(tool, 4);
}

// ============ 主流程 ============
function main() {
  const { list: snippets, errors } = loadSnippets();
  console.log(`已加载 snippet: ${snippets.length} / 解析失败: ${errors.length}`);
  if (errors.length) {
    console.log("解析失败列表:");
    for (const e of errors) console.log(`  ${e.file}: ${e.error}`);
  }

  const toolsTsContent = fs.readFileSync(TOOLS_TS, "utf8");
  const { existingTools, header, footer } = parseExistingTools(toolsTsContent);
  console.log(`已加载现有 tools.ts 条目: ${existingTools.length}`);

  // 准备处理桶
  const dropped = [];
  const migrated = [];
  const merged = []; // 同物合并：升级 existing
  const overwritten = []; // 同 slug 覆盖：升级 existing
  const newEntries = []; // 全新

  // 索引现有 tools by slug
  const existingBySlug = new Map(existingTools.map((t) => [t.slug, t]));

  for (const { file, obj } of snippets) {
    const slug = obj.slug;
    if (DROP.has(slug)) {
      dropped.push({ slug, file });
      continue;
    }
    if (MIGRATE_TO_GLOSSARY.has(slug)) {
      migrated.push({ slug, file, obj });
      continue;
    }
    if (MERGE_TO_EXISTING[slug]) {
      const targetSlug = MERGE_TO_EXISTING[slug];
      const target = existingBySlug.get(targetSlug);
      if (!target) {
        console.error(`同物合并目标不存在: ${slug} → ${targetSlug}`);
        continue;
      }
      const upgraded = upgradeExisting(target, obj);
      existingBySlug.set(targetSlug, upgraded);
      merged.push({ from: slug, to: targetSlug });
      continue;
    }
    if (SAME_SLUG_OVERWRITE.has(slug) || existingBySlug.has(slug)) {
      const target = existingBySlug.get(slug);
      if (target) {
        const upgraded = upgradeExisting(target, obj);
        existingBySlug.set(slug, upgraded);
        overwritten.push({ slug });
        continue;
      }
    }
    // 全新
    newEntries.push(obj);
  }

  // 重建 existingTools 数组（按原顺序，应用升级）
  const upgradedExisting = existingTools.map((t) => existingBySlug.get(t.slug) || t);

  // 最终数组：现有（已升级）+ 新增
  const finalTools = [...upgradedExisting, ...newEntries];

  // 序列化
  const serialized = finalTools.map(serializeTool).join(",\n  ");
  const newToolsTs = `${header}export const tools: Tool[] = [\n  ${serialized},\n];${footer}`;

  // 写回
  fs.writeFileSync(TOOLS_TS, newToolsTs, "utf8");
  console.log(`已写入 tools.ts: 总条目 ${finalTools.length}`);

  // 迁 glossary 暂存
  if (!fs.existsSync(PENDING_GLOSSARY_DIR)) {
    fs.mkdirSync(PENDING_GLOSSARY_DIR, { recursive: true });
  }
  for (const m of migrated) {
    const out = path.join(PENDING_GLOSSARY_DIR, m.file);
    const original = fs.readFileSync(path.join(SNIPPETS_DIR, m.file), "utf8");
    fs.writeFileSync(out, original, "utf8");
  }

  // 报告
  const report = `# tools.ts 拼装报告（${new Date().toISOString().slice(0, 10)}）

## 摘要

- snippet 总数：${snippets.length}
- 解析失败：${errors.length}
- 现有条目：${existingTools.length}
- **drop**：${dropped.length} 条 → ${dropped.map((d) => d.slug).join(", ")}
- **迁 glossary**：${migrated.length} 条 → ${migrated.map((m) => m.slug).join(", ")}
- **同物合并到现有**：${merged.length} 条 → ${merged.map((m) => `${m.from}→${m.to}`).join(", ")}
- **同 slug 覆盖**：${overwritten.length} 条 → ${overwritten.map((o) => o.slug).join(", ")}
- **新增**：${newEntries.length} 条
- **最终 tools.ts 总数**：${finalTools.length}

## 新增条目（${newEntries.length}）

${newEntries.map((e) => `- ${e.slug} | ${e.category} | ${e.region || "?"} | ${e.vendor || "?"}`).join("\n")}

## 迁 glossary 详情

snippet 已暂存到 \`knowledge-base/sources/_pending_glossary_from_tools/\`，glossary 第四批做时一并处理。
`;
  fs.writeFileSync(REPORT_PATH, report, "utf8");
  console.log(`报告已写入: ${REPORT_PATH}`);
}

main();
