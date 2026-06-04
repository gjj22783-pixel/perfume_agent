import { FormulaResponse } from './types';

export function buildFallbackResponse(userText: string): FormulaResponse {
  const rainy = /雨|阴|湿|潮/.test(userText);
  const warm = /热|夏|晒/.test(userText);
  const date = /约会|恋爱|暧昧/.test(userText);

  if (date) {
    return {
      fragrancePositioning: {
        style: '温柔贴肤花麝香',
        keywords: ['soft', 'romantic', 'skin scent'],
        suitableScenarios: ['date', 'dinner', 'close contact']
      },
      formula: {
        topNotes: [{ name: 'Bergamot', percentage: 10 }],
        heartNotes: [{ name: 'Rose', percentage: 12 }, { name: 'Neroli', percentage: 10 }, { name: 'Iris', percentage: 8 }],
        baseNotes: [{ name: 'White Musk', percentage: 30 }, { name: 'Sandalwood', percentage: 18 }, { name: 'Vanilla', percentage: 6 }]
      },
      blendingSuggestion: {
        recommendedConcentration: 'EDP',
        targetVolumeMl: 10,
        fragranceConcentrateMl: 1.8,
        alcoholMl: 7.7,
        solventMl: 0.5,
        maceration: '10-14 days'
      },
      finalEffect: {
        opening: '轻柔明亮，没攻击性',
        heart: '花香柔软，贴近皮肤',
        drydown: '温暖麝香与木质包裹感',
        sillage: 'low-medium',
        longevity: 'medium'
      },
      adjustments: {
        fresher: '增加佛手柑',
        softer: '增加白麝香',
        longerLasting: '增加檀香或琥珀'
      },
      safetyNote: 'DIY 建议，不替代专业安全评估。',
      rawText: 'fallback date formula'
    };
  }

  if (rainy) {
    return {
      fragrancePositioning: {
        style: '雨后校园书卷气',
        keywords: ['rainy', 'tea', 'clean', 'soft woody'],
        suitableScenarios: ['commute', 'library', 'walking']
      },
      formula: {
        topNotes: [{ name: 'Bergamot', percentage: 16 }, { name: 'Green Notes', percentage: 7 }, { name: 'Aquatic Notes', percentage: 4 }],
        heartNotes: [{ name: 'White Tea', percentage: 21 }, { name: 'Iris', percentage: 10 }, { name: 'Violet Leaf', percentage: 8 }],
        baseNotes: [{ name: 'Cedarwood', percentage: 14 }, { name: 'White Musk', percentage: 14 }, { name: 'Vetiver', percentage: 6 }]
      },
      blendingSuggestion: {
        recommendedConcentration: 'EDP',
        targetVolumeMl: 10,
        fragranceConcentrateMl: 1.8,
        alcoholMl: 7.7,
        solventMl: 0.5,
        maceration: '10-14 days'
      },
      finalEffect: {
        opening: '潮湿空气里的清亮柑橘',
        heart: '茶感、纸张感、安静',
        drydown: '贴肤木质和白麝香',
        sillage: 'low-medium',
        longevity: 'medium'
      },
      adjustments: {
        fresher: '增加绿叶或水生调',
        softer: '增加白麝香',
        longerLasting: '增加雪松或少量琥珀'
      },
      safetyNote: 'DIY 建议，不替代专业安全评估。',
      rawText: 'fallback rainy formula'
    };
  }

  if (warm) {
    return {
      fragrancePositioning: {
        style: '夏日清爽通勤香',
        keywords: ['fresh', 'citrus', 'tea', 'soft musk'],
        suitableScenarios: ['office', 'commute', 'daytime']
      },
      formula: {
        topNotes: [{ name: 'Bergamot', percentage: 18 }, { name: 'Lemon', percentage: 8 }],
        heartNotes: [{ name: 'White Tea', percentage: 22 }, { name: 'Neroli', percentage: 10 }],
        baseNotes: [{ name: 'White Musk', percentage: 22 }, { name: 'Cedarwood', percentage: 12 }, { name: 'Vetiver', percentage: 8 }]
      },
      blendingSuggestion: {
        recommendedConcentration: 'EDP',
        targetVolumeMl: 10,
        fragranceConcentrateMl: 1.8,
        alcoholMl: 7.7,
        solventMl: 0.5,
        maceration: '7-14 days'
      },
      finalEffect: {
        opening: '明亮清爽',
        heart: '干净茶感与皂感',
        drydown: '轻木质和麝香',
        sillage: 'low-medium',
        longevity: 'medium'
      },
      adjustments: {
        fresher: '增加柠檬或葡萄柚',
        softer: '增加白茶和白麝香',
        longerLasting: '增加雪松'
      },
      safetyNote: 'DIY 建议，不替代专业安全评估。',
      rawText: 'fallback warm formula'
    };
  }

  return {
    fragrancePositioning: {
      style: '高级冷淡感木质茶香',
      keywords: ['minimal', 'cool', 'tea', 'woody'],
      suitableScenarios: ['office', 'commute', 'library']
    },
    formula: {
      topNotes: [{ name: 'Bergamot', percentage: 14 }],
      heartNotes: [{ name: 'White Tea', percentage: 24 }, { name: 'Iris', percentage: 8 }, { name: 'Violet Leaf', percentage: 6 }],
      baseNotes: [{ name: 'Cedarwood', percentage: 16 }, { name: 'White Musk', percentage: 22 }, { name: 'Vetiver', percentage: 10 }]
    },
    blendingSuggestion: {
      recommendedConcentration: 'EDP',
      targetVolumeMl: 10,
      fragranceConcentrateMl: 1.8,
      alcoholMl: 7.7,
      solventMl: 0.5,
      maceration: '10-14 days'
    },
    finalEffect: {
      opening: '干净冷感',
      heart: '茶感与纸张感',
      drydown: '木质麝香贴肤',
      sillage: 'low',
      longevity: 'medium'
    },
    adjustments: {
      fresher: '增加佛手柑',
      softer: '增加白麝香',
      longerLasting: '增加雪松或琥珀'
    },
    safetyNote: 'DIY 建议，不替代专业安全评估。',
    rawText: 'fallback default formula'
  };
}
