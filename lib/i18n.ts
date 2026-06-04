export type Lang = 'zh' | 'en';

export const t = {
  siteTitle: { zh: 'Perfume Agent', en: 'Perfume Agent' },
  heroTitle: { zh: '你的 AI 调香顾问', en: 'Your AI Perfumery Advisor' },
  heroDesc: {
    zh: '输入天气、场景、偏好、情绪，AI 会给出前中后调、比例、效果说明，并支持连续追问修改。',
    en: 'Describe the weather, occasion, mood, or style you want — the AI will generate a full formula with top/heart/base notes, blending ratios, expected effects, and supports follow-up refinements.'
  },
  modeLLM: { zh: '✨ 当前：真实大模型模式', en: '✨ Live AI Model' },
  modeFallback: { zh: '🧪 当前：演示规则模式', en: '🧪 Demo Rule Mode' },
  inputLabel: { zh: '告诉我你的需求', en: 'Tell me what you need' },
  inputPlaceholder: {
    zh: '例如：今天 30 度很热，我想做一支适合办公室通勤的香水，不要太甜，要干净一点。',
    en: 'e.g. Hot summer day, I want a clean office-friendly scent, not too sweet, with a crisp tea note.'
  },
  btnFirst: { zh: '生成第一版配方', en: 'Generate Formula' },
  btnContinue: { zh: '继续对话 / 调整配方', en: 'Continue / Refine Formula' },
  btnLoading: { zh: '生成中...', en: 'Generating...' },
  hintFollowUp: {
    zh: '建议追问：再冷一点 / 不要玫瑰 / 改成适合夏天 / 我只有这些原料',
    en: 'Try: make it cooler / remove rose / make it more summery / I only have these materials'
  },
  historyTitle: { zh: '对话历史', en: 'Conversation' },
  historyEmpty: {
    zh: '还没有历史对话。生成后，你就可以持续追问，让 AI 沿着上一版配方继续修改。',
    en: 'No conversation yet. After generating, you can keep refining the formula with follow-up messages.'
  },
  resultTitle: { zh: '生成结果', en: 'Formula Result' },
  resultHint: {
    zh: '这个区域会持续刷新最新版本的香水方案。你越具体，Agent 调出来的配方越有个性。',
    en: 'This area refreshes with the latest formula. The more specific you are, the more personalized the result.'
  },
  resultEmpty: {
    zh: '还没有结果，先在左边输入需求并点击按钮。',
    en: 'No result yet. Enter your request and click the button.'
  },
  blockAIReply: { zh: 'AI 回复', en: 'AI Reply' },
  blockPositioning: { zh: '香气定位', en: 'Fragrance Positioning' },
  blockBlending: { zh: '调配建议', en: 'Blending Suggestion' },
  blockFormula: { zh: '配方结构', en: 'Formula Structure' },
  blockEffect: { zh: '最终效果', en: 'Final Effect' },
  blockAdjust: { zh: '调整建议', en: 'Adjustment Advice' },
  blockSafety: { zh: '安全提醒', en: 'Safety Note' },
  labelStyle: { zh: '风格', en: 'Style' },
  labelKeywords: { zh: '关键词', en: 'Keywords' },
  labelScenarios: { zh: '适合场景', en: 'Suitable Scenarios' },
  labelConcentration: { zh: '推荐浓度', en: 'Concentration' },
  labelVolume: { zh: '目标容量', en: 'Target Volume' },
  labelConcentrate: { zh: '香精浓缩液', en: 'Fragrance Concentrate' },
  labelAlcohol: { zh: '酒精', en: 'Alcohol' },
  labelSolvent: { zh: '其他溶剂', en: 'Solvent (DPG/Water)' },
  labelMaceration: { zh: '熟化时间', en: 'Maceration' },
  labelOpening: { zh: '前段', en: 'Opening' },
  labelHeart: { zh: '中段', en: 'Heart' },
  labelDrydown: { zh: '尾调', en: 'Drydown' },
  labelSillage: { zh: '扩散性', en: 'Sillage' },
  labelLongevity: { zh: '留香', en: 'Longevity' },
  labelFresher: { zh: '更清新', en: 'Fresher' },
  labelSofter: { zh: '更柔和', en: 'Softer' },
  labelLonger: { zh: '更有留香', en: 'Longer-lasting' },
  topNotes: { zh: '前调 Top Notes', en: 'Top Notes' },
  heartNotes: { zh: '中调 Heart Notes', en: 'Heart Notes' },
  baseNotes: { zh: '后调 Base Notes', en: 'Base Notes' },
  roleYou: { zh: 'You', en: 'You' },
  roleAgent: { zh: 'Agent', en: 'Agent' },
  debugTitle: { zh: '调试提示', en: 'Debug Info' },
  fallbackReply: {
    zh: '线上大模型调用失败，当前自动切换为演示版规则生成。你仍然可以继续测试配方逻辑。',
    en: 'Live AI call failed, switched to demo rule mode. You can still test the formula logic.'
  }
} as const;
