# GitHub 发布指南

项目已完成本地构建与 Git 提交。由于当前环境 GitHub 连接器未授权，你需要手动将代码推送到你的 GitHub 仓库。下面是详细步骤。

---

## 方案一：使用 GitHub 网页 + 本地命令（推荐）

### 1. 在 GitHub 创建空仓库

1. 打开 [https://github.com/new](https://github.com/new)
2. 仓库名称填写：`ai-parameter-lab`
3. 选择 **Public**（公开）
4. 不要勾选 README、.gitignore 或 license（本地已包含）
5. 点击 **Create repository**

### 2. 绑定远程仓库并推送

在项目目录下执行以下命令（将 `你的用户名` 替换为你的 GitHub 用户名）：

```bash
cd "C:\Users\Administrator\WorkBuddy\2026-06-26-17-35-27\ai-parameter-lab"

# 重命名分支为 main（GitHub 默认推荐）
git branch -M main

# 添加远程仓库
git remote add origin https://github.com/你的用户名/ai-parameter-lab.git

# 推送代码
git push -u origin main
```

首次推送会提示输入 GitHub 用户名和密码（或 Token）。建议使用 **Personal Access Token (PAT)** 作为密码。

---

## 方案二：使用 GitHub Desktop（图形化）

1. 安装 [GitHub Desktop](https://desktop.github.com/)
2. 选择 **File → Add local repository...**
3. 选择项目目录：`C:\Users\Administrator\WorkBuddy\2026-06-26-17-35-27\ai-parameter-lab`
4. 点击 **Publish repository**
5. 填写仓库名称 `ai-parameter-lab`，选择公开，点击 **Publish repository**

---

## 方案三：通过 WorkBuddy GitHub 连接器自动推送

如果你希望我在 WorkBuddy 内直接完成推送，请：

1. 点击 WorkBuddy 顶部/侧边栏的 **连接器管理**
2. 找到 **GitHub** 并点击连接/授权
3. 授权后告诉我你希望创建的仓库名
4. 我会使用 GitHub 连接器为你创建仓库并推送

---

## 启用 GitHub Pages 自动部署

推送成功后，代码仓库中的 `.github/workflows/deploy.yml` 会自动在每次推送 `main` 分支时构建并部署到 GitHub Pages。

1. 进入 GitHub 仓库 → **Settings** → **Pages**
2. 在 **Source** 中选择 **GitHub Actions**
3. 等待 Actions 运行完成
4. 访问 `https://你的用户名.github.io/ai-parameter-lab/`

---

## 发布后的代码仓链接格式

推送完成后，你的代码仓链接为：

```
https://github.com/你的用户名/ai-parameter-lab
```

请将 `你的用户名` 替换为你的真实 GitHub 用户名，即可得到最终链接。

---

## 注意事项

- 当前仓库已包含 `.gitignore`，`node_modules` 和 `dist` 不会被提交
- 如需连接真实 AI 模型，请在仓库中设置 `VITE_OPENAI_API_KEY` 或 `VITE_ANTHROPIC_API_KEY`（但注意不要在公开仓库中提交 `.env` 文件）
- GitHub Pages 部署仅支持静态页面，真实 API 调用需要代理或后端支持，演示模式下使用本地模拟模型即可
