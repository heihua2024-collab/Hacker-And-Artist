import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const raw = JSON.parse(
  fs.readFileSync(path.join(__dirname, "_tools-audit-raw.json"), "utf8"),
);

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

/** Human overrides after automated scan */
function effectiveStatus(row) {
  let s = row.dupStatus;
  if (row.slug === "voluma-ai") s = "NEW"; // 误报：normalize 后含子串 luma，非 Luma 竞品
  if (row.slug === "threejs-gaussian-splatting")
    s = "SUSPECT_DUPLICATE(antimatter15-splat)"; // 同仓库 antimatter15/splat，站内已有 slug
  return s;
}

function primaryStatus(row) {
  if (row.drop) return row.drop;
  if (row.miscat) return row.miscat;
  const es = effectiveStatus(row);
  if (es.startsWith("DUPLICATE_OVERWRITE")) return "DUPLICATE_OVERWRITE";
  if (es.startsWith("SUSPECT_DUPLICATE")) return es;
  return "NEW";
}

function fieldCol(row) {
  if (!row.fieldIssues.length) return "-";
  return "INVALID_TAXONOMY: " + row.fieldIssues.join("; ");
}

function strCol(row) {
  if (!row.strViol.length) return "-";
  return (
    "STRING_CONSTRAINT_VIOLATION: " +
    row.strViol
      .slice(0, 6)
      .map((v) => `line ${v.line} 含 ${v.char}`)
      .join("; ") +
    (row.strViol.length > 6 ? ` …共 ${row.strViol.length} 处` : "")
  );
}

function suggestAction(row) {
  const p = primaryStatus(row);
  if (p === "DROP_CANDIDATE") return "drop（待 Opus 确认）";
  if (p === "MISCATEGORIZED_TO_GLOSSARY") return "迁 glossary 或改类";
  if (p === "DUPLICATE_OVERWRITE") return "覆盖现有 tools.ts 同 slug";
  if (p.startsWith("SUSPECT_DUPLICATE")) return "等 Opus 决策合并或保留";
  const fc = fieldCol(row);
  const sc = strCol(row);
  if (fc !== "-" && sc !== "-")
    return "修 taxonomy 与中文字符串后入库";
  if (fc !== "-") return "对齐 taxonomy（tags/useCases 等）后入库";
  if (sc !== "-") return "修中文 zh 引号/反引号等后入库";
  return "直接拼装";
}

const rows = raw.map((row) => {
  const es = effectiveStatus(row);
  return { ...row, effectiveDup: es, primary: primaryStatus(row) };
});

rows.sort((a, b) => a.slug.localeCompare(b.slug));

let nNewClean = 0;
let nDup = 0;
let nSus = 0;
let nMiscat = 0;
let nDrop = 0;
let nField = 0;
let nStr = 0;
let nWeak = 0;

for (const r of rows) {
  if (r.primary === "DUPLICATE_OVERWRITE") nDup++;
  else if (r.primary.startsWith("SUSPECT_DUPLICATE")) nSus++;
  else if (r.primary === "MISCATEGORIZED_TO_GLOSSARY") nMiscat++;
  else if (r.primary === "DROP_CANDIDATE") nDrop++;
  if (r.fieldIssues.length) nField++;
  if (r.strViol.length) nStr++;
  if (r.weakSrc) nWeak++;
  if (
    r.primary === "NEW" &&
    !r.fieldIssues.length &&
    !r.strViol.length &&
    !r.weakSrc &&
    !r.miscat &&
    !r.drop
  )
    nNewClean++;
}

const invalidDetails = [];
const strDetails = [];
const suspectDetails = [];

for (const r of rows) {
  if (r.fieldIssues.length) {
    invalidDetails.push(
      `- **${r.slug}**：${r.fieldIssues.join("；")}`,
    );
  }
  if (r.strViol.length) {
    const lines = [...new Set(r.strViol.map((v) => v.line))].sort(
      (a, b) => a - b,
    );
    strDetails.push(
      `- **${r.slug}**：${lines.map((l) => `line ${l}`).join("、")} — ${r.strViol
        .slice(0, 3)
        .map((v) => v.char)
        .join(", ")}${r.strViol.length > 3 ? " …" : ""}`,
    );
  }
}

suspectDetails.push(
  `- **superspl-at** vs **supersplat**：slug 疑似录入笔误拆字（spl-at）；现有 supersplat 已为 PlayCanvas 官方条目。snippet 与正式条并存 → 极可能重复，建议合并或删重复 slug。`,
);
suspectDetails.push(
  `- **gsplat-js** vs **gsplat**：名称子串相似但产品不同（JS 查看/绑定库 vs 训练侧 gsplat）。自动化因 normalize 子串匹配标疑似；建议 Opus 保留两条若仓库不同。`,
);
suspectDetails.push(
  `- **threejs-gaussian-splatting** vs **antimatter15-splat**（tools.ts）：GitHub 均为 antimatter15/splat，中文 description 已写明与站内 antimatter15-splat 合并考量 → 高置信同物异名，建议统一 slug。`,
);
suspectDetails.push(
  `- **voluma-ai**：曾误标 SUSPECT(luma-ai)；normalize 后 **volumai** 含 **luma** 子串所致，与 Luma AI 无必然关系 → 按 **NEW** 处理。`,
);

const md = `# tools Snippet 审计报告（2026-04-30）

## 摘要

| 指标 | 数量 |
|------|------|
| 总 snippet 数 | 89 |
| 直接入库（NEW，无 taxonomy/字符串/sources 问题） | ${nNewClean} |
| 覆盖现有（DUPLICATE_OVERWRITE） | ${nDup} |
| 疑似重复（SUSPECT_DUPLICATE） | ${nSus} |
| 跨类错放（MISCATEGORIZED_TO_GLOSSARY） | ${nMiscat} |
| drop 候选（DROP_CANDIDATE） | ${nDrop} |
| 字段合规问题（INVALID_TAXONOMY 等） | ${nField} |
| 硬约束违规（中文 zh 含禁字符） | ${nStr} |
| 弱 sources（&lt;2） | ${nWeak} |

说明：**直接入库** 指主状态为 NEW、且无 INVALID_TAXONOMY、无 STRING_CONSTRAINT_VIOLATION、无 WEAK_SOURCES。多数条目 \`useCases\`/\`tags\` 使用了非 taxonomy 的扩展枚举（如 \`education\`、\`desktop\`、\`real_estate\`），需统一映射后才能无损拼装。

## 决策表（全量 89 条）

| slug | 状态 | 字段问题 | 硬约束违规 | 建议动作 |
|------|------|----------|------------|----------|
${rows
  .map(
    (r) =>
      `| ${r.slug} | ${r.primary}${r.effectiveDup !== r.primary && r.primary === "NEW" ? "（dup=" + r.effectiveDup + "）" : ""} | ${fieldCol(r)} | ${strCol(r)} | ${suggestAction(r)} |`,
  )
  .join("\n")}

## 详细问题清单

### INVALID_TAXONOMY（tags / level / useCases / category / pricing / platforms / region / discoverySource）

以下条目 \`tags\` 含非 \`taxonomy.ts\` 的 TagId（如 mobile、desktop、opensource、commercial、freemium），和/或 \`useCases\` 含非 \`spaceTypes\` 的 id（如 education、event、performance、real_estate、park）。需映射到现有 ID 或扩展 taxonomy（由 Opus 定）。

${invalidDetails.length ? invalidDetails.join("\n") : "- （无）"}

### STRING_CONSTRAINT_VIOLATION（中文 zh 字面量）

规则：中文字符串内禁用英文 \`"\` \`'\` \`\` \` \`\\\\\` \`\${\`（本批主要为 **反引号** 包裹英文技术词出现在 zh 行）。

${strDetails.length ? strDetails.join("\n") : "- （无）"}

### SUSPECT_DUPLICATE 详细

${suspectDetails.join("\n\n")}

### DROP_CANDIDATE 说明

- **glassbox-rs**：keep 名与公开仓库名不一致；映射到 LioQing/wgpu-3dgs-viewer；\`verified: false\`。
- **spatialux**：\`homepageUrl: null\`，域名停放，无可用产品页。
- **splatical**：\`homepageUrl: null\`，Chrome Web Store 无同名扩展。

### MISSING_EVIDENCE（evidenceQuote）

全 89 条均含 \`evidenceQuote\` 字段（含非空内容），**0** 条缺失。

### WEAK_SOURCES

全 89 条 \`sources\` 数组均 **≥2** 条 URL 字符串，**0** 条弱来源。

---

*生成脚本：\`_audit/_run-tools-audit.mjs\`、\`_emit-tools-audit-md.mjs\`；原始 JSON：\`_tools-audit-raw.json\`。仅只读审计，未修改 \`src/\` 与 snippet。*
`;

fs.writeFileSync(
  path.join(__dirname, "audit-tools-2026-04-30.md"),
  md,
  "utf8",
);
console.log("Wrote audit-tools-2026-04-30.md, nNewClean=", nNewClean);
