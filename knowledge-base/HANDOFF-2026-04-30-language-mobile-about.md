# TOP3DGS / 印刻万物 接力交接记录（2026-04-30 23:50）

> 用途：给新窗口快速接手，避免重复读取长上下文。当前工作目录：`C:\Users\15319\inktoys-landing`。今天暂不提交 GitHub，等本轮功能和内容都改完再统一提交。

## 本轮用户目标

1. 默认语言从中文优先改为英文优先；中文需要用户点击语言切换后才显示。
2. 检查中英文桌面端和手机端排版，修复手机端首页「Quick Access / 快速入口」点击不动的问题。
3. 修复 About Us 手机端背景粒子桥特效不加载或不可见的问题。
4. 保存进度到 MD，并提供一个新窗口激活提示词。
5. 视觉美化继续作为后续待办，等高斯泼溅模型链接到位后再整体更新。

## 已完成修改

### 1. 默认语言改为英文优先

文件：`src/components/shared/LanguageProvider.tsx`

- 初始语言从 `"zh"` 改为 `"en"`。
- 增加 `localStorage` 记忆键：`top3dgs-language`。
- 首次访问默认英文；用户切到中文后会记住中文。
- 清浏览器缓存、新设备、新浏览器仍默认英文。
- 切换语言时同步更新 `document.documentElement.lang`。

文件：`src/app/layout.tsx`

- 根 `<html lang>` 从 `zh-CN` 改为 `en`，匹配英文优先策略。

### 2. 手机端首页 Quick Access 修复

文件：`src/components/landing/CommunityHome.tsx`

- 首页移动端快速入口增加：
  - `relative z-20`
  - `touch-pan-x`
  - `snap-x`
  - `overscroll-x-contain`
  - `[-webkit-overflow-scrolling:touch]`
- 每个快捷入口 `Link` 增加显式 `router.push(href)`，避免只聚焦不跳转。
- 浏览器验证：在手机宽度下点击 `Tools`，页面成功跳转到 `/tools`。

### 3. About Us 手机端粒子桥修复

文件：`src/components/webgl/SceneCanvas.tsx`

- 移动端粒子量降低：
  - `ambient`：移动端 900，桌面 1800。
  - `full`：移动端 2200，桌面 4600。
- WebGL DPR 从 full 模式 `[1, 1.5]` 调整为 `[1, 1.25]`。
- `powerPreference` 从 `"high-performance"` 改为 `"default"`，降低部分移动设备初始化失败风险。

文件：`src/components/landing/InktoysLanding.tsx`

- About hero 的 `scene-layer` 内增加一个只在手机端显示的 CSS 粒子桥兜底层。
- 即使 WebGL 慢启动或丢上下文，手机端也能看到类似粒子桥的背景视觉。
- 浏览器验证：`/about` 手机宽度下粒子背景可见，标题和按钮未遮挡。

## 验证结果

已执行：

```powershell
npm run build
```

结果：

- Build 通过。
- TypeScript 通过。
- 静态导出兼容。
- 生成 74 个静态路由。
- `/search`、`/icon.svg`、`/robots.txt`、`/sitemap.xml` 都保持静态生成。

浏览器检查：

- `http://localhost:3000/`：默认英文显示，按钮为「中文」。
- 首页手机宽度：Quick Access 可见，`Tools` 点击后成功进入 `/tools`。
- `/tools`：英文与中文切换可用。
- `/about`：手机宽度下背景粒子桥可见。

注意：

- Cursor 浏览器工具注入的 `data-cursor-ref` 会在 dev 环境触发 React hydration mismatch 提示；这属于浏览器调试工具注入属性导致的开发态提示，不是生产构建错误。`npm run build` 已通过。
- Three.js 在 dev console 中可能出现 `THREE.Clock deprecated` 或 WebGL context lost 警告；本轮已经降低移动端 WebGL 压力，并给 About 增加 CSS 兜底。

## 尚未提交 GitHub

用户明确要求：今天先不传 GitHub，等今天整体改完后再统一提交。

当前仍需后续处理：

- 等用户提供高斯泼溅模型链接后，补充 gallery / cases / learning / homepage 的可交互 3DGS 体验。
- 视觉美化作为后续待办，等模型链接接入后统一更新。
- 如用户提供原始高清 logo PNG/SVG，可替换当前手工 SVG 复刻版本，做到真正 1:1。
- 如果用户确认新邮箱（例如 `hello@top3dgs.com`），再把 About 页面 `hello@inktoys.cn` 统一替换。

## 新窗口激活提示词

复制下面这段到新窗口即可继续：

```text
你现在接手 TOP3DGS / 印刻万物 网站开发。工作目录是 C:\Users\15319\inktoys-landing。请先读取 knowledge-base/HANDOFF-2026-04-30-language-mobile-about.md 获取最新状态，不要重新读完整历史上下文。

当前状态：
- 全站搜索已开启，/search 可用。
- 品牌已从 INKTOYS 切换为 印刻万物 / TOP3DGS。
- logo/favicon 已使用三色球体 SVG 复刻版。
- 默认语言已改为英文优先，中文通过语言按钮切换，并使用 localStorage 记忆。
- 首页手机端 Quick Access 点击已修复。
- About 手机端粒子桥已降负载并增加 CSS 兜底。
- npm run build 已通过，74 个静态路由。
- 今天先不要提交 GitHub，等用户确认整体改完再统一提交。

下一阶段待办：
1. 等用户提供高斯泼溅模型链接后，把模型接入 gallery / cases / homepage / learning 相关位置。
2. 在模型链接接入后，统一做视觉美化和交互体验升级。
3. 如用户提供原始高清 logo 文件，替换当前手工 SVG 复刻版。
4. 如用户确认 top3dgs.com 邮箱，替换 About 中的 hello@inktoys.cn。

继续工作时请用中文简体回复。
```
