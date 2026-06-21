# iGEM Perfume Agent Booth

一个面向 iGEM 路演展台的香水配方 Agent。访客用自然语言描述想要的情绪、场景或风格，系统会从展台已有香水原料中选择 3-5 种，生成可现场执行的试香配方，并收集体验后的评分与反馈。

## 当前线上地址

- 展台体验页：https://perfume-booth-app.vercel.app
- 反馈后台：https://perfume-booth-app.vercel.app/admin/feedback
- 记录 JSON：https://perfume-booth-app.vercel.app/api/records
- CSV 下载：https://perfume-booth-app.vercel.app/api/records?format=csv

## 当前模型

线上当前接入的是：

```text
OPENAI_MODEL=deepseek-v4-flash
```

模型通过 OpenAI-compatible Chat Completions API 调用，`OPENAI_BASE_URL` 与 `OPENAI_API_KEY` 配置在 Vercel 环境变量中。

## 核心功能

- 根据用户需求生成香水配方。
- 只使用展台数据库中的已购香水原料。
- 输出前调、中调、后调结构和比例。
- 把配方转换成现场可执行的喷香步骤。
- 支持短对话追问，不限制轮数。
- 用户问“为什么加某个原料”时，解释当前配方，不擅自重生成。
- 生成后收集 1-5 分评分和文字反馈。
- 后台持续记录用户需求、AI 回复、配方和反馈。
- 支持 CSV 下载，便于路演后统计分析。

## 后端存储

项目使用 Vercel Neon Postgres 作为真实持久化存储。

记录表会自动创建：

```sql
booth_records
```

记录类型：

- `generation`：用户输入、对话历史、生成模式、AI 回复、完整配方。
- `feedback`：session ID、评分、文字反馈。

后台会按 session 汇总展示每位体验者的完整链路：

```text
用户需求 -> AI 回复 -> 配方 -> 用户评分/反馈
```

## 环境变量

```text
OPENAI_API_KEY=
OPENAI_BASE_URL=
OPENAI_MODEL=deepseek-v4-flash
DATABASE_URL=
POSTGRES_URL=
```

`DATABASE_URL` / `POSTGRES_URL` 由 Vercel Neon 集成提供。

## 本地运行

```powershell
npm install
npm run build
npm run start -- --hostname 127.0.0.1 --port 3000
```

开发模式：

```powershell
npm run dev -- --hostname 127.0.0.1 --port 3000
```

## 项目结构

```text
app/
  page.tsx                  展台主界面
  globals.css               全局样式
  admin/feedback/page.tsx   后台记录页
  api/
    generate/route.ts       配方生成接口
    feedback/route.ts       评分反馈接口
    records/route.ts        记录查询与 CSV 下载接口

data/
  ingredients.ts            展台香水原料数据库

lib/
  explain.ts                解释类追问处理
  generator.ts              本地兜底生成
  i18n.ts                   界面文案
  llm.ts                    LLM 调用
  prompt.ts                 系统提示词
  records.ts                Neon Postgres 记录层
  types.ts                  共享类型
  validation.ts             输出校验
```

## 部署

项目部署在 Vercel。

```powershell
npx vercel deploy --prod --yes
```

部署后建议检查：

- 首页是否正常打开。
- `/api/generate` 是否可以生成配方。
- `/api/feedback` 是否可以提交评分。
- `/admin/feedback` 是否能看到记录。
- `/api/records?format=csv` 是否能下载 CSV。

## 维护注意

- 暂时不要添加实体瓶身编号，展台瓶身排序还未最终确定。
- 修改中文文案后，需要检查乱码。
- 解释类追问必须保留当前配方，不要重生成。
- 路演场景以快速、易懂、低摩擦体验为主，不要把主界面做成复杂后台。
