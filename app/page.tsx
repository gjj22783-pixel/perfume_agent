'use client';

import { useState } from 'react';
import type { ChatMessage, GenerateResponse } from '@/lib/types';
import { type Lang, t } from '@/lib/i18n';

export default function HomePage() {
  const [lang, setLang] = useState<Lang>('zh');
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<(GenerateResponse & { debug?: string }) | null>(null);
  const [error, setError] = useState('');
  const [history, setHistory] = useState<ChatMessage[]>([]);

  function tr(key: keyof typeof t) { return t[key][lang]; }

  async function handleGenerate() {
    const userMessage: ChatMessage = { role: 'user', content: input };
    const nextHistory = [...history, userMessage];

    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, history })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Generation failed');

      const reply =
        data.mode === 'fallback'
          ? tr('fallbackReply')
          : (data.replyText || 'Formula suggestion generated.');

      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: reply
      };

      setHistory([...nextHistory, assistantMessage]);
      setResult(data);
      setInput('');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#fff1f7_0%,_#fde7f3_18%,_#f5d0fe_40%,_#ddd6fe_62%,_#f5f3ff_100%)] text-slate-900">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-10">
        <header className="overflow-hidden rounded-[28px] border border-white/60 bg-white/70 p-8 shadow-[0_20px_80px_rgba(168,85,247,0.16)] backdrop-blur-xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.35em] text-fuchsia-700/80">{tr('siteTitle')}</p>
              <h1 className="text-4xl font-semibold text-slate-900 md:text-5xl">{tr('heroTitle')}</h1>
              <p className="max-w-3xl text-base leading-7 text-slate-700">{tr('heroDesc')}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex overflow-hidden rounded-2xl border border-fuchsia-200 bg-white/80 shadow-lg">
                <button
                  onClick={() => setLang('en')}
                  className={`px-4 py-2 text-xs font-medium transition ${
                    lang === 'en' ? 'bg-fuchsia-500 text-white' : 'text-slate-600 hover:bg-fuchsia-50'
                  }`}
                >EN</button>
                <button
                  onClick={() => setLang('zh')}
                  className={`px-4 py-2 text-xs font-medium transition ${
                    lang === 'zh' ? 'bg-fuchsia-500 text-white' : 'text-slate-600 hover:bg-fuchsia-50'
                  }`}
                >中文</button>
              </div>
              <div className="rounded-2xl border border-fuchsia-200 bg-white/80 px-4 py-3 text-sm text-slate-900 shadow-lg backdrop-blur">
                {result?.mode === 'llm' ? <span className="text-fuchsia-600">⚡ deepseek-v4-flash</span> : tr('modeFallback')}
              </div>
            </div>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[0.88fr_1.12fr]">
          <div className="space-y-6">
            <div className="rounded-[28px] border border-white/60 bg-white/72 p-5 shadow-[0_16px_60px_rgba(236,72,153,0.12)] backdrop-blur-xl">
              <label className="mb-3 block text-sm font-medium text-slate-900">{tr('inputLabel')}</label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="min-h-[180px] w-full rounded-2xl border border-fuchsia-100 bg-white/90 p-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-fuchsia-400"
                placeholder={tr('inputPlaceholder')}
              />
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <button
                  onClick={handleGenerate}
                  disabled={loading || !input.trim()}
                  className="rounded-2xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 px-6 py-3 text-sm font-medium text-white shadow-[0_12px_32px_rgba(217,70,239,0.25)] transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? tr('btnLoading') : history.length ? tr('btnContinue') : tr('btnFirst')}
                </button>
                <span className="text-sm text-slate-600">{tr('hintFollowUp')}</span>
              </div>
              {error ? <p className="mt-3 text-sm text-rose-600">{error}</p> : null}
              {result?.debug ? (
                <div className="mt-4 rounded-2xl border border-amber-300 bg-amber-50 p-3 text-xs leading-6 text-amber-900">
                  <div className="mb-1 font-semibold">{tr('debugTitle')}</div>
                  <div>{result.debug}</div>
                </div>
              ) : null}
            </div>

            <div className="rounded-[28px] border border-white/60 bg-white/72 p-5 shadow-[0_16px_60px_rgba(99,102,241,0.12)] backdrop-blur-xl">
              <h2 className="mb-3 text-lg font-semibold text-slate-900">{tr('historyTitle')}</h2>
              <div className="max-h-[460px] space-y-3 overflow-auto pr-1">
                {history.length === 0 ? (
                  <p className="text-sm text-slate-500">{tr('historyEmpty')}</p>
                ) : (
                  history.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`rounded-3xl px-4 py-3 text-sm leading-6 shadow-lg ${
                        msg.role === 'user'
                          ? 'ml-8 border border-fuchsia-200 bg-gradient-to-r from-fuchsia-100 to-pink-100 text-slate-900'
                          : 'mr-8 border border-cyan-200 bg-gradient-to-r from-cyan-50 to-violet-100 text-slate-900'
                      }`}
                    >
                      <p className="mb-1 text-xs uppercase tracking-wider text-slate-500">
                        {msg.role === 'user' ? tr('roleYou') : tr('roleAgent')}
                      </p>
                      <p>{msg.content}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <section className="rounded-[28px] border border-white/60 bg-white/72 p-6 shadow-[0_16px_60px_rgba(168,85,247,0.14)] backdrop-blur-xl">
            <h2 className="mb-2 text-3xl font-semibold text-slate-900">{tr('resultTitle')}</h2>
            <p className="mb-5 text-sm text-slate-600">{tr('resultHint')}</p>
            {loading ? (
              <div className="animate-pulse space-y-4">
                <div className="rounded-2xl border border-white/60 bg-gradient-to-br from-fuchsia-50 to-pink-50 p-4 shadow-lg">
                  <div className="mb-3 h-4 w-20 rounded-full bg-fuchsia-200"></div>
                  <div className="space-y-2">
                    <div className="h-3 w-full rounded bg-fuchsia-100"></div>
                    <div className="h-3 w-3/4 rounded bg-fuchsia-100"></div>
                    <div className="h-3 w-1/2 rounded bg-fuchsia-100"></div>
                  </div>
                </div>
                <div className="rounded-2xl border border-white/60 bg-gradient-to-br from-violet-50 to-cyan-50 p-4 shadow-lg">
                  <div className="mb-3 h-4 w-24 rounded-full bg-violet-200"></div>
                  <div className="space-y-2">
                    <div className="h-3 w-2/3 rounded bg-violet-100"></div>
                    <div className="h-3 w-1/2 rounded bg-violet-100"></div>
                  </div>
                </div>
                <div className="rounded-2xl border border-white/60 bg-gradient-to-br from-amber-50 to-rose-50 p-4 shadow-lg">
                  <div className="mb-3 h-4 w-20 rounded-full bg-amber-200"></div>
                  <div className="space-y-1.5">
                    <div className="h-3 w-3/4 rounded bg-amber-100"></div>
                    <div className="h-3 w-2/3 rounded bg-amber-100"></div>
                    <div className="h-3 w-1/2 rounded bg-amber-100"></div>
                  </div>
                </div>
                <div className="rounded-2xl border border-white/60 bg-gradient-to-br from-cyan-50 to-emerald-50 p-4 shadow-lg">
                  <div className="mb-3 h-4 w-24 rounded-full bg-cyan-200"></div>
                  <div className="flex gap-3">
                    <div className="flex-1 space-y-2">
                      <div className="h-8 w-full rounded-xl bg-cyan-100"></div>
                      <div className="h-8 w-full rounded-xl bg-cyan-100"></div>
                      <div className="h-8 w-full rounded-xl bg-cyan-100"></div>
                    </div>
                  </div>
                </div>
                <p className="text-center text-sm text-fuchsia-500">🌸 AI 正在为你调配专属香氛...</p>
              </div>
            ) : !result ? (
              <p className="text-slate-500">{tr('resultEmpty')}</p>
            ) : (
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="space-y-4">
                  <Block title={tr('blockAIReply')} accent="from-fuchsia-50 to-pink-50">
                    <p className="text-sm leading-6 text-slate-800">{result.replyText}</p>
                  </Block>
                  <Block title={tr('blockPositioning')} accent="from-violet-50 to-cyan-50">
                    <Line label={tr('labelStyle')} value={result.formula.fragrancePositioning.style} />
                    <Line label={tr('labelKeywords')} value={result.formula.fragrancePositioning.keywords.join(', ')} />
                    <Line label={tr('labelScenarios')} value={result.formula.fragrancePositioning.suitableScenarios.join(', ')} />
                  </Block>

                  <Block title={tr('blockBlending')} accent="from-amber-50 to-rose-50">
                    <Line label={tr('labelConcentration')} value={result.formula.blendingSuggestion.recommendedConcentration} />
                    <Line label={tr('labelVolume')} value={String(result.formula.blendingSuggestion.targetVolumeMl) + ' ml'} />
                    <Line label={tr('labelConcentrate')} value={String(result.formula.blendingSuggestion.fragranceConcentrateMl) + ' ml'} />
                    <Line label={tr('labelAlcohol')} value={String(result.formula.blendingSuggestion.alcoholMl) + ' ml'} />
                    <Line label={tr('labelSolvent')} value={String(result.formula.blendingSuggestion.solventMl) + ' ml'} />
                    <Line label={tr('labelMaceration')} value={result.formula.blendingSuggestion.maceration} />
                  </Block>
                </div>

                <div className="space-y-4">
                  <Block title={tr('blockFormula')} accent="from-cyan-50 to-emerald-50">
                    <NotesSection title={tr('topNotes')} items={result.formula.formula.topNotes} color="from-pink-100 to-fuchsia-100" />
                    <NotesSection title={tr('heartNotes')} items={result.formula.formula.heartNotes} color="from-violet-100 to-cyan-100" />
                    <NotesSection title={tr('baseNotes')} items={result.formula.formula.baseNotes} color="from-amber-100 to-rose-100" />
                  </Block>

                  <Block title={tr('blockEffect')} accent="from-rose-50 to-orange-50">
                    <Line label={tr('labelOpening')} value={result.formula.finalEffect.opening} />
                    <Line label={tr('labelHeart')} value={result.formula.finalEffect.heart} />
                    <Line label={tr('labelDrydown')} value={result.formula.finalEffect.drydown} />
                    <Line label={tr('labelSillage')} value={result.formula.finalEffect.sillage} />
                    <Line label={tr('labelLongevity')} value={result.formula.finalEffect.longevity} />
                  </Block>

                  <Block title={tr('blockAdjust')} accent="from-emerald-50 to-lime-50">
                    <Line label={tr('labelFresher')} value={result.formula.adjustments.fresher} />
                    <Line label={tr('labelSofter')} value={result.formula.adjustments.softer} />
                    <Line label={tr('labelLonger')} value={result.formula.adjustments.longerLasting} />
                  </Block>

                  <Block title={tr('blockSafety')} accent="from-slate-50 to-white">
                    <p className="text-sm leading-6 text-slate-800">{result.formula.safetyNote}</p>
                  </Block>
                </div>
              </div>
            )}
          </section>
        </section>
      </div>
    </main>
  );
}

function Block({ title, children, accent }: { title: string; children: React.ReactNode; accent: string }) {
  return (
    <div className={'rounded-[24px] border border-white/60 bg-gradient-to-br ' + accent + ' p-4 shadow-lg'}>
      <h3 className="mb-3 text-base font-semibold text-slate-900">{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Line({ label, value }: { label: string; value: string }) {
  return (
    <p className="text-sm leading-6 text-slate-800">
      <span className="mr-2 text-slate-500">{label}:</span>
      <span>{value}</span>
    </p>
  );
}

function NotesSection({ title, items, color }: { title: string; items: { name: string; percentage: number }[]; color: string }) {
  return (
    <div className="mb-4 last:mb-0">
      <p className="mb-2 text-sm font-medium text-slate-900">{title}</p>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={title + '-' + item.name} className={'flex items-center justify-between rounded-2xl border border-white/60 bg-gradient-to-r ' + color + ' px-3 py-2 text-sm text-slate-900'}>
            <span>{item.name}</span>
            <span>{item.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
