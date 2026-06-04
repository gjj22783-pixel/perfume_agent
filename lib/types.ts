export type ChatMessage = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

export type NoteItem = {
  name: string;
  percentage: number;
};

export type FormulaResponse = {
  fragrancePositioning: {
    style: string;
    keywords: string[];
    suitableScenarios: string[];
  };
  formula: {
    topNotes: NoteItem[];
    heartNotes: NoteItem[];
    baseNotes: NoteItem[];
  };
  blendingSuggestion: {
    recommendedConcentration: string;
    targetVolumeMl: number;
    fragranceConcentrateMl: number;
    alcoholMl: number;
    solventMl: number;
    maceration: string;
  };
  finalEffect: {
    opening: string;
    heart: string;
    drydown: string;
    sillage: string;
    longevity: string;
  };
  adjustments: {
    fresher: string;
    softer: string;
    longerLasting: string;
  };
  safetyNote: string;
  rawText: string;
};

export type GenerateResponse = {
  mode: 'llm' | 'fallback';
  replyText: string;
  formula: FormulaResponse;
};

/** 防御性规范化 LLM 返回的 formula，避免前端 crash */
export function sanitizeFormula(raw: any): FormulaResponse {
  const str = (v: any) => (typeof v === 'string' ? v : '');
  const arr = (v: any) => (Array.isArray(v) ? v : []);
  const num = (v: any) => (typeof v === 'number' && !Number.isNaN(v) ? v : 0);

  const pos = raw?.fragrancePositioning || {};
  const fml = raw?.formula || {};
  const blend = raw?.blendingSuggestion || {};
  const eff = raw?.finalEffect || {};
  const adj = raw?.adjustments || {};

  return {
    fragrancePositioning: {
      style: str(pos.style),
      keywords: arr(pos.keywords).map(String),
      suitableScenarios: arr(pos.suitableScenarios).map(String)
    },
    formula: {
      topNotes: arr(fml.topNotes).map((n: any) => ({ name: str(n?.name), percentage: num(n?.percentage) })),
      heartNotes: arr(fml.heartNotes).map((n: any) => ({ name: str(n?.name), percentage: num(n?.percentage) })),
      baseNotes: arr(fml.baseNotes).map((n: any) => ({ name: str(n?.name), percentage: num(n?.percentage) }))
    },
    blendingSuggestion: {
      recommendedConcentration: str(blend.recommendedConcentration),
      targetVolumeMl: num(blend.targetVolumeMl),
      fragranceConcentrateMl: num(blend.fragranceConcentrateMl),
      alcoholMl: num(blend.alcoholMl),
      solventMl: num(blend.solventMl),
      maceration: str(blend.maceration)
    },
    finalEffect: {
      opening: str(eff.opening),
      heart: str(eff.heart),
      drydown: str(eff.drydown),
      sillage: str(eff.sillage),
      longevity: str(eff.longevity)
    },
    adjustments: {
      fresher: str(adj.fresher),
      softer: str(adj.softer),
      longerLasting: str(adj.longerLasting)
    },
    safetyNote: str(raw?.safetyNote),
    rawText: str(raw?.rawText)
  };
}
