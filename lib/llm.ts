import { SYSTEM_PROMPT } from './prompt';
import type { ChatMessage, GenerateResponse } from './types';

function getEnv(name: string) {
  return process.env[name]?.trim();
}

function normalizeBaseUrl(baseUrl: string) {
  return baseUrl.replace(/\/+$/, '');
}

export async function generateWithLLM(messages: ChatMessage[]): Promise<GenerateResponse | null> {
  const apiKey = getEnv('OPENAI_API_KEY');
  const baseUrl = normalizeBaseUrl(getEnv('OPENAI_BASE_URL') || 'https://api.openai.com/v1');
  const model = getEnv('OPENAI_MODEL') || 'gpt-4.1-mini';

  if (!apiKey) {
    throw new Error('运行环境缺少 OPENAI_API_KEY');
  }

  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model,
      temperature: 0.6,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages.map((m) => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: m.content }))
      ]
    })
  });

  const rawText = await response.text();

  if (!response.ok) {
    throw new Error(`LLM 请求失败: ${response.status} ${rawText}`);
  }

  let data: any;
  try {
    data = JSON.parse(rawText);
  } catch {
    throw new Error(`LLM 返回了非 JSON 内容: ${rawText.slice(0, 300)}`);
  }

  const content = data?.choices?.[0]?.message?.content;
  if (!content) throw new Error(`LLM 返回内容为空: ${rawText.slice(0, 300)}`);

  let parsed: any;
  try {
    parsed = JSON.parse(content);
  } catch {
    throw new Error(`LLM message.content 不是合法 JSON: ${String(content).slice(0, 300)}`);
  }

  return {
    mode: 'llm',
    replyText: parsed.replyText,
    formula: parsed.formula
  } satisfies GenerateResponse;
}
