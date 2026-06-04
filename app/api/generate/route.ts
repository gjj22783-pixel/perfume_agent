import { NextRequest, NextResponse } from 'next/server';
import { buildFallbackResponse } from '@/lib/generator';
import { generateWithLLM } from '@/lib/llm';
import { sanitizeFormula } from '@/lib/types';
import type { ChatMessage } from '@/lib/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const message = String(body?.message || '').trim();
    const history = Array.isArray(body?.history) ? body.history : [];

    if (!message) {
      return NextResponse.json({ error: 'message is required' }, { status: 400 });
    }

    const messages: ChatMessage[] = [
      ...history
        .filter(function (item: any) { return item && (item.role === 'user' || item.role === 'assistant') && typeof item.content === 'string'; })
        .map(function (item: any) { return { role: item.role, content: item.content }; }),
      { role: 'user', content: message }
    ];

    try {
      var llmResult = await generateWithLLM(messages);
      if (llmResult) return NextResponse.json({
        ...llmResult,
        formula: sanitizeFormula(llmResult.formula)
      });
    } catch (llmError) {
      var fallback = buildFallbackResponse(message);
      return NextResponse.json({
        mode: 'fallback',
        replyText: '',
        formula: fallback,
        debug: llmError instanceof Error ? llmError.message : 'Unknown LLM error'
      });
    }

    var fallback2 = buildFallbackResponse(message);
    return NextResponse.json({
      mode: 'fallback',
      replyText: '我先基于本地规则给你一版初稿。如果你接入了真实大模型，我还能继续根据你的追问做更细的多轮调整。',
      formula: fallback2
    });
  } catch (error) {
    return NextResponse.json({ error: 'failed to generate response' }, { status: 500 });
  }
}
