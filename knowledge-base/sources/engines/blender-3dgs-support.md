---
# === 通用必填 ===
slug: blender-3dgs-support
type: engine-support
title-zh: Blender
title-en: Blender

# === 引擎/软件特定字段 ===
engine-name: Blender
engine-vendor: Blender Foundation
engine-category: 3d-software
engine-platforms:
  - windows
  - macos
  - linux
engine-pricing: open-source

# === 3DGS 兼容性 ===
splat-import: true
splat-import-formats:
  - ply
splat-export: true
splat-render: plugin
splat-edit: false
splat-render-method: rasterization

# === 实现方式 ===
implementation: community-plugin
plugin-name: 3D Gaussian Splatting (gaussian-splatting-blender-addon)
plugin-url: https://github.com/ReshotAI/gaussian-splatting-blender-addon
plugin-author: Alexandre Carlier
first-supported: null
latest-tested-version: null

# === 来源与抓取 ===
source-url: https://github.com/ReshotAI/gaussian-splatting-blender-addon
source-author: null
captured-at: 2026-04-29
captured-by: auto
language: en
verification: pending
verified-by: null
verified-at: null

# === 反幻觉 ===
quote-en: |
  class ImportGaussianSplatting(bpy.types.Operator):
      bl_idname = "object.import_gaussian_splatting"
      bl_label = "Import Gaussian Splatting"
      bl_description = "Import a 3D Gaussian Splatting file into the scene"
      bl_options = {"REGISTER", "UNDO"}

      filepath: bpy.props.StringProperty(
          name="File Path",
          description="Path to the Gaussian Splatting file",
          subtype='FILE_PATH',
      )
quote-zh: null
sources:
  - https://raw.githubusercontent.com/ReshotAI/gaussian-splatting-blender-addon/master/blender-addon/__init__.py
  - https://raw.githubusercontent.com/ReshotAI/gaussian-splatting-blender-addon/master/README.md
  - https://raw.githubusercontent.com/ReshotAI/gaussian-splatting-blender-addon/master/blender-addon/blender_manifest.toml
  - https://github.com/ReshotAI/gaussian-splatting-blender-addon/commit/dad654521f5a8d091050219b756ada93d90da98f

license: 引用合理使用
notes: |
  - 本条「支持 3DGS」按 TASK 定义：已训练好的 3DGS 资源能否在软件内以高斯泼溅方式打开并渲染；不包含「仅为 3DGS 训练拍多视角数据」类插件（例如 Blender Extensions 上的 Splats 扩展属工作流前端，本条不作为 splat-render 依据）。
  - 通用「Import PLY」几何节点/节点式导入仅处理 PLY 通用几何，不读取 3DGS 常用的球谐与协方差相关属性；不能据此视为 splat-import: true。此处 splat-import 仅指 ReshotAI 仓库中 ImportGaussianSplatting：使用 PlyData.read 并读取 f_dc / f_rest、scale、rot、opacity 等字段后建材质节点，用于视口内显示。
  - 用户问题「ReshotAI 训练好的 .ply / .splat，能否在 Blender 里打开并 360° 旋转查看」：manifest 与 __init__.py 中 Import/Export 路径均围绕 PLY（permissions 写明 Import/export PLY from/to disk）；源码未见读取 `.splat` 二进制格式的分支。标准 3DGS 训练输出的 `point_cloud.ply` 类文件可通过该附加组件导入为场景对象；导入后可在 Blender 视口用常规相机环绕观察，但 README/源码未出现「360°」字面，此处不宣称单独功能名。
  - splat-render 填 plugin：核心 Blender 默认安装不包含上述导入与专用材质链路；需安装该社区插件。若仅依赖「通用 PLY 点云」而不走本插件，则不构成 TASK 定义的 3DGS 渲染，应视为 none；本条记录的是插件路径故为 plugin。
  - 插件维护：GitHub default 分支最近一次可见提交为 2024-08-30（合并 PR #40，见 sources 第 4 条 commit 页）；仓库无 Releases 列表（API 返回空数组）。属长期未更新状态，由人工复核是否仍适用于当前 Blender 版本。
  - splat-edit 保守填 false：README 强调实验性与清理 floaters；TASK 表格将 splat-edit 定义为对单个高斯体的删除/缩放/调色等，二者不等同；不在此将「清理 floaters」记为 true。
  - README 未逐行列出文件扩展名；格式列表以 blender_manifest.toml 中「Import/export PLY」及源码仅调用 PlyData.read 为据，仅列 ply，不写入 .splat / .ksplat。
---

# 原文摘录 / 链接证据

自 sources 第 1 条（`__init__.py`）ImportGaussianSplatting 与导出说明：

> class ImportGaussianSplatting(bpy.types.Operator):
>     bl_idname = "object.import_gaussian_splatting"
>     bl_label = "Import Gaussian Splatting"
>     bl_description = "Import a 3D Gaussian Splatting file into the scene"

导入执行路径中使用 `PlyData.read(self.filepath)` 并读取 `f_dc_*`、`f_rest_*`、`scale_*`、`rot_*`、`opacity` 等属性（同文件后续 `execute` 实现）。

自 sources 第 2 条（`README.md`）：

> This add-on was developed mostly as an experimentation, it is slow on large scenes, and not fully accurate. It can be used as a tool to clean floaters in Gaussian Splatting captures.

自 sources 第 3 条（`blender_manifest.toml`）：

> files = "Import/export PLY from/to disk"

> blender_version_min = "4.2.0"

自 sources 第 4 条（GitHub commit 页元信息，抓取时可见）：

> Date: 2024-08-30T14:32:18Z

> Merge pull request #40 from zeptofine/blender-manifest

## 工作流速记

安装 ReshotAI 仓库中的「3D Gaussian Splatting」Blender 附加组件（manifest 标明最低 Blender 4.2.0）；在 3D 视口侧栏使用该组件的「Import Gaussian Splatting」选择已训练的 3DGS PLY（仓库权限说明为 PLY 磁盘导入/导出）。若仅有 `.splat` 二进制，本仓库 manifest 与已读源码未提供对应导入，需另寻转换或其它工具。勿将仅用于生成多视角训练数据的扩展与「已训练 splat 的导入渲染」混淆。
