# Campus Hub 使用手册

校园信息助手的使用与维护文档，使用 VitePress 构建。

- [GitHub Pages](https://law100.github.io/)
- [文档站](https://docs.law100.xyz/)
- [旧博客](https://oldblog.law100.xyz/)

## 本地预览

```sh
npm ci
npm run dev
```

## 构建

```sh
npm run build
```

提交到 main 后由 GitHub Actions 构建并发布。Pages 发布来源使用 GitHub Actions，Custom domain 留空。

日常内容在 Campus Hub 项目的 manual/ 目录维护，由文档发布入口同步到本仓库。本仓库仅存放文档及必要构建文件。
