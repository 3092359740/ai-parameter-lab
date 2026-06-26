# AI Parameter Lab | 大模型参数调优实验室

一个面向大语言模型（LLM）参数调优与对比的前沿 AI 实验平台。通过可视化的前端界面，直观探索 **Temperature、Top-p、Max Tokens、Frequency Penalty、Presence Penalty** 等核心参数对生成结果的影响。

> 本前端界面会显示提交者学号与姓名，适合课程作业、AI 项目演示与技术分享。

---

## 项目亮点

- 前沿 AI 方向：聚焦大模型参数优化、Prompt Engineering 与生成结果可解释性
- 可视化调参：滑块实时调整参数，即时观察输出变化
- 多模型支持：本地模拟 + OpenAI GPT-4 / GPT-3.5 + Anthropic Claude
- 参数对比：一键将不同参数下的生成结果加入对比面板，并排分析
- 可迁移部署：Docker、Docker Compose、GitHub Pages 自动化部署
- 学生信息展示：页面顶部固定显示学号与姓名，可编辑并持久化

---

## 技术栈

- React 18 + Vite 5
- Tailwind CSS 3
- Lucide React 图标库
- Docker / Nginx
- GitHub Actions (CI/CD → GitHub Pages)

---

## 快速开始

### 1. 克隆仓库

```bash
git clone https://github.com/你的用户名/ai-parameter-lab.git
cd ai-parameter-lab
```

### 2. 安装依赖

```bash
npm install
```

### 3. 启动开发服务器

```bash
npm run dev
```

浏览器访问 `http://localhost:5173`。

### 4. 配置真实 AI 模型（可选）

复制环境变量模板并填写 API Key：

```bash
cp .env.example .env
```

编辑 `.env`：

```env
VITE_OPENAI_API_KEY=sk-...
VITE_ANTHROPIC_API_KEY=sk-...
```

> 注意：默认使用本地模拟模型，无需 API Key 即可运行演示。

### 5. 构建生产版本

```bash
npm run build
```

构建产物位于 `dist/` 目录。

---

## Docker 部署（迁移与上线）

### 方式一：Docker Compose（推荐）

```bash
docker-compose up -d --build
```

访问 `http://localhost:8080`。

### 方式二：手动 Docker 构建

```bash
docker build -t ai-parameter-lab .
docker run -d -p 8080:80 ai-parameter-lab
```

---

## GitHub Pages 自动化部署

1. 将代码推送到 GitHub 仓库
2. 进入仓库 Settings → Pages → Source，选择 **GitHub Actions**
3. 工作流 `.github/workflows/deploy.yml` 会在每次推送 `main` 分支时自动构建并部署

---

## 项目结构

```
ai-parameter-lab/
├── public/                   # 静态资源
├── src/
│   ├── components/           # React 组件
│   │   ├── Header.jsx        # 顶部导航 + 学号姓名展示
│   │   ├── ModelSelector.jsx # 模型选择
│   │   ├── ParameterPanel.jsx# 参数调优面板
│   │   ├── ChatInterface.jsx # 单参数实验对话
│   │   └── ComparisonView.jsx# 参数对比视图
│   ├── utils/
│   │   └── ai.js             # AI 生成逻辑与参数配置
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .github/workflows/        # GitHub Actions 部署
├── Dockerfile / docker-compose.yml / nginx.conf
├── .env.example
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

---

## 功能截图说明

1. **顶部信息栏**：显示项目名称、学生姓名与学号，点击编辑按钮可修改
2. **模型选择**：支持本地模拟与 OpenAI / Claude 真实模型
3. **参数面板**：拖动滑块调整 Temperature、Top-p 等参数，使用快速预设
4. **单参数实验**：输入 Prompt，查看当前参数下的生成结果
5. **加入对比**：将结果加入对比区，支持多组参数并排比较

---

## 学习价值

- 理解大模型核心生成参数的作用与相互影响
- 掌握 React + Vite 现代前端工程化实践
- 体验 Docker 容器化部署与 GitHub Actions CI/CD
- 学习 Prompt Engineering 与生成结果可解释性分析

---

## 许可证

MIT License

---

**作者信息**：页面顶部显示的学生姓名与学号，请在使用时替换为自己的真实信息。
