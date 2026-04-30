import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const raw = JSON.parse(
  fs.readFileSync(path.join(__dirname, "_cng-audit-raw.json"), "utf8"),
);

const caseSuspectOverride = {
  "mip-splatting": "SUSPECT_DUPLICATE(mip-splatting-anti-aliased)",
  sugar: "SUSPECT_DUPLICATE(sugar-surface-aligned-meshes)",
};

function effectiveDup(row, batch) {
  if (batch === "cases" && caseSuspectOverride[row.slug])
    return caseSuspectOverride[row.slug];
  return row.dupStatus;
}

function primaryStatus(row, batch) {
  if (row.drop) return row.drop;
  const es = effectiveDup(row, batch);
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
      .slice(0, 4)
      .map((v) => `line ${v.line} 含 ${v.char}`)
      .join("; ") +
    (row.strViol.length > 4 ? ` …共 ${row.strViol.length} 处` : "")
  );
}

function suggestAction(row, batch, p) {
  if (p === "DROP_CANDIDATE") return "drop（待 Opus 确认）";
  if (p === "DUPLICATE_OVERWRITE") return "覆盖现有 src/lib/data 同 id";
  if (p.startsWith("SUSPECT_DUPLICATE")) return "等 Opus 决策合并或保留";
  const fc = fieldCol(row);
  const sc = strCol(row);
  if (row.missingQuote && batch === "cases")
    return "补 quote 或确认可空后入库";
  if (fc !== "-" && sc !== "-") return "修 taxonomy 与中文字符串后入库";
  if (fc !== "-") return "对齐 taxonomy 后入库";
  if (sc !== "-") return "修中文 zh 禁字符后入库";
  return "直接拼装";
}

function slugCol(row, batch) {
  return batch === "news" || batch === "glossary" ? row.slug : row.slug;
}

function buildMd(batch, title, idLabel) {
  const rows = raw[batch].map((r) => ({ ...r }));
  rows.sort((a, b) => a.slug.localeCompare(b.slug));

  let nNewClean = 0,
    nDup = 0,
    nSus = 0,
    nDrop = 0,
    nField = 0,
    nStr = 0,
    nWeak = 0,
    nMissQ = 0;

  const tableRows = rows.map((r) => {
    const es = effectiveDup(r, batch);
    const p = primaryStatus(r, batch);
    if (p === "DUPLICATE_OVERWRITE") nDup++;
    else if (p.startsWith("SUSPECT_DUPLICATE")) nSus++;
    else if (p === "DROP_CANDIDATE") nDrop++;
    if (r.fieldIssues.length) nField++;
    if (r.strViol.length) nStr++;
    if (r.weakSrc) nWeak++;
    if (r.missingQuote) nMissQ++;
    if (
      p === "NEW" &&
      !r.fieldIssues.length &&
      !r.strViol.length &&
      !r.weakSrc &&
      !r.drop &&
      !(r.missingQuote && batch === "cases")
    )
      nNewClean++;

    return {
      r,
      p,
      es,
      field: fieldCol(r),
      str: strCol(r),
      act: suggestAction(r, batch, p),
    };
  });

  const invalidDetails = rows
    .filter((r) => r.fieldIssues.length)
    .map((r) => `- **${r.slug}**：${r.fieldIssues.join("；")}`);

  const strDetails = rows
    .filter((r) => r.strViol.length)
    .map((r) => {
      const lines = [...new Set(r.strViol.map((v) => v.line))].sort(
        (a, b) => a - b,
      );
      return `- **${r.slug}**：${lines.join("、")} — ${r.strViol[0].char}`;
    });

  const suspectBlock =
    batch === "cases"
      ? `### SUSPECT_DUPLICATE 详细（人工标注）

- **mip-splatting** vs **mip-splatting-anti-aliased**（cases.ts 现有）：slug 不同一，但主题均为 Mip-Splatting 论文线，建议 Opus 决定合并 slug 或双开 milestone。
- **sugar** vs **sugar-surface-aligned-meshes**（cases.ts 现有）：短 slug 与长 slug 可能同指 SuGaR 工作，建议核对 arXiv 与项目页后合并。
`
      : "";

  return `# ${title} Snippet 审计报告（2026-04-30）

## 摘要

| 指标 | 数量 |
|------|------|
| 总 snippet 数 | ${rows.length} |
| 直接入库（NEW，无 taxonomy/字符串/sources/quote 问题） | ${nNewClean} |
| 覆盖现有（DUPLICATE_OVERWRITE） | ${nDup} |
| 疑似重复（SUSPECT_DUPLICATE） | ${nSus} |
| 跨类错放（MISCATEGORIZED） | 0（本摊未启用） |
| drop 候选（DROP_CANDIDATE） | ${nDrop} |
| 字段合规问题 | ${nField} |
| 硬约束违规（中文 zh） | ${nStr} |
| 弱 sources（&lt;2） | ${nWeak} |
${batch === "cases" ? `| 缺 quote 对象或双空（MISSING_QUOTE） | ${nMissQ} |` : ""}

**对照文件**：\`src/lib/data/${batch === "cases" ? "cases.ts（slug）" : batch === "news" ? "news.ts（id）" : "glossary.ts（id）"}\`；**taxonomy**：\`src/lib/taxonomy.ts\`。

## 决策表（全量 ${rows.length} 条）

| ${idLabel} | 状态 | 字段问题 | 硬约束违规 | 建议动作 |
|------|------|----------|------------|----------|
${tableRows
  .map(
    (x) =>
      `| ${x.r.slug} | ${x.p} | ${x.field} | ${x.str} | ${x.act} |`,
  )
  .join("\n")}

## 详细问题清单

### INVALID_TAXONOMY

${invalidDetails.length ? invalidDetails.join("\n") : "- （无）"}

### STRING_CONSTRAINT_VIOLATION

${strDetails.length ? strDetails.join("\n") : "- （无）"}

${batch === "cases" ? `### MISSING_QUOTE（quote 块缺失或中英文皆空）\n\n${rows.filter((r) => r.missingQuote).length ? rows.filter((r) => r.missingQuote).map((r) => `- **${r.slug}**`).join("\n") : "- （无）"}\n` : ""}
${suspectBlock}
### WEAK_SOURCES

${nWeak ? rows.filter((r) => r.weakSrc).map((r) => `- **${r.slug}**（${r.srcCount} 条）`).join("\n") : "- （无）"}

---

*机器扫描：\`_audit/_run-cng-audit.mjs\` + 本脚本；原始 JSON：\`_cng-audit-raw.json\`。只读审计，未修改 \`src/\` 与 snippet。*
`;
}

fs.writeFileSync(
  path.join(__dirname, "audit-cases-2026-04-30.md"),
  buildMd("cases", "cases", "slug"),
  "utf8",
);
fs.writeFileSync(
  path.join(__dirname, "audit-news-2026-04-30.md"),
  buildMd("news", "news", "id"),
  "utf8",
);
fs.writeFileSync(
  path.join(__dirname, "audit-glossary-2026-04-30.md"),
  buildMd("glossary", "glossary", "id"),
  "utf8",
);
console.log("Wrote audit-cases, audit-news, audit-glossary");
