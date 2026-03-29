import { NextRequest, NextResponse } from 'next/server'

/**
 * POST /api/ai-coach
 *
 * Analizza dati di sessione o giro singolo tramite AI (OpenAI o Claude).
 * Il provider attivo si configura con la variabile d'ambiente AI_PROVIDER.
 *
 * ── Request body ────────────────────────────────────────────────────────────
 *
 * {
 *   type     : "session" | "lap"   // obbligatorio — tipo di analisi
 *   payload  : object              // obbligatorio — dati da analizzare (vedi sotto)
 *   vehicle? : string              // opzionale  — es. "Porsche 911 GT3", "Yamaha R1"
 * }
 *
 * ── Payload consigliato per type = "session" ────────────────────────────────
 *
 * {
 *   circuit  : string              // nome del circuito, es. "Monza"
 *   date     : string              // data sessione, es. "2025-06-14"
 *   laps: [
 *     {
 *       number   : number          // numero giro
 *       time_ms  : number          // tempo giro in millisecondi
 *       delta_ms : number          // delta rispetto al best lap (negativo = più veloce)
 *       max_speed_kmh : number     // velocità massima nel giro
 *       avg_speed_kmh : number     // velocità media nel giro
 *     }
 *   ]
 *   best_lap_ms : number           // tempo best lap della sessione in ms
 *   conditions? : string           // es. "asciutto", "bagnato"
 * }
 *
 * ── Payload consigliato per type = "lap" ────────────────────────────────────
 *
 * {
 *   circuit       : string         // nome del circuito
 *   lap_number    : number
 *   lap_time_ms   : number
 *   best_lap_ms   : number         // best lap della sessione (per calcolare il delta)
 *   delta_ms      : number         // delta rispetto al best (negativo = più veloce)
 *   max_speed_kmh : number
 *   avg_speed_kmh : number
 *   sectors?: [                    // opzionale — se disponibili
 *     {
 *       name      : string         // es. "S1", "T1–T3"
 *       time_ms   : number
 *       delta_ms  : number
 *       speed_kmh?: number
 *     }
 *   ]
 *   previous_laps?: [              // opzionale — giri precedenti per contesto
 *     { number: number, time_ms: number }
 *   ]
 * }
 *
 * ── Response (200 OK) ────────────────────────────────────────────────────────
 *
 * {
 *   markdown   : string            // report formattato in Markdown (italiano)
 *   confidence : number            // 0.0–1.0, confidenza dell'analisi
 *   tags       : string[]          // es. ["frenata", "consistenza", "traiettoria"]
 * }
 *
 * ── Response (4xx / 5xx) ────────────────────────────────────────────────────
 *
 * {
 *   error : string                 // messaggio d'errore leggibile
 * }
 *
 * ── Env vars ────────────────────────────────────────────────────────────────
 *
 * AI_PROVIDER        = "openai" | "claude"   (default: "openai")
 * OPENAI_API_KEY     = sk-...
 * ANTHROPIC_API_KEY  = sk-ant-...
 * OPENAI_MODEL       = gpt-4.1               (default)
 * CLAUDE_MODEL       = claude-sonnet-4-6     (default)
 */

// ─── Global provider switch ────────────────────────────────────────────────
// Set AI_PROVIDER=claude in .env.local to route all requests through Anthropic.
// Falls back to 'openai' if not set.
const AI_PROVIDER = (process.env.AI_PROVIDER ?? 'openai') as 'openai' | 'claude'

const OPENAI_MODEL = process.env.OPENAI_MODEL ?? 'gpt-4.1'
const CLAUDE_MODEL = process.env.CLAUDE_MODEL ?? 'claude-sonnet-4-6'
// ──────────────────────────────────────────────────────────────────────────

type LapAiComment = {
  markdown: string
  confidence: number
  tags: string[]
}

const LAP_COMMENT_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    markdown: { type: 'string' },
    confidence: { type: 'number' },
    tags: { type: 'array', items: { type: 'string' } },
  },
  required: ['markdown', 'confidence', 'tags'],
}

// ─── System prompts ────────────────────────────────────────────────────────

function sessionPrompt(vehicle?: string): string {
  const v = vehicle ? ` su ${vehicle}` : ''
  return `Sei un coach di guida esperto per lap timer. Analizza i dati di questa sessione in pista${v}.

Rispondi in italiano con un report Markdown ben formattato. Struttura il report così:

## Sintesi sessione
Una riga con il giudizio complessivo della sessione.

## Progressione tempi
Analizza il trend dei giri — miglioramento, calo, plateau. Identifica in quale parte della sessione il pilota era più in forma. Se il delta ha segno meno davanti vuol dire che il giro è più veloce del best.

## Consistenza
Analizza la varianza tra i giri. Un pilota consistente è un pilota che migliora. Dai un giudizio numerico sulla consistenza (es. deviazione standard dei tempi).

## Punti di forza
Cosa ha funzionato in questa sessione.

## Aree prioritarie di miglioramento
Massimo 3 aree, in ordine di impatto sul tempo. Sii specifico e concreto — no generalità.

## Piano per la prossima sessione
2-3 obiettivi concreti e misurabili da portare in pista. Es. "Ritarda il punto di frenata alla curva X di 10 metri".

Rispondi esclusivamente in Markdown.`
}

function lapPrompt(vehicle?: string): string {
  const v = vehicle ? ` su ${vehicle}` : ''
  return `Sei un coach di guida esperto per lap timer. Analizza i dati di questo giro${v}.

Rispondi in italiano con un report Markdown ben formattato. Struttura il report così:

## Sintesi giro
Una riga — giudizio complessivo del giro e delta rispetto al best. Fai attenzione al delta, se ha segno meno davanti vuol dire che il giro è più veloce del best, se ha segno più è più lento.

## Analisi velocità
Confronta velocità massima e media con i giri precedenti se disponibili. Identifica dove si perde velocità.

## Analisi tecnica per settore
Se riconosci le curve dal nome del circuito, analizza curva per curva con suggerimenti specifici su traiettoria, punto di frenata e punto di corda. Altrimenti analizza per settori.

## Top 3 miglioramenti
I tre interventi con maggior impatto sul tempo, in ordine di priorità. Sii chirurgico — indica metri, velocità, marce dove possibile.

## Focus per il prossimo giro
Un solo obiettivo da portare in pista nel giro successivo. Uno solo — la semplicità aiuta la concentrazione in guida.

Rispondi esclusivamente in Markdown.`
}

// ─── Provider implementations ──────────────────────────────────────────────

function extractOpenAIText(json: Record<string, unknown>): string | null {
  try {
    const output = json['output'] as Array<Record<string, unknown>> | undefined
    const content = (output?.[0]?.['content']) as Array<Record<string, unknown>> | undefined
    return content?.[0]?.['text'] as string ?? null
  } catch {
    return null
  }
}

async function callOpenAI(systemPrompt: string, payload: unknown): Promise<LapAiComment> {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) throw new Error('OPENAI_API_KEY is not set')

  const res = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      input: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: JSON.stringify(payload) },
      ],
      text: {
        format: {
          type: 'json_schema',
          name: 'lap_comment',
          schema: LAP_COMMENT_SCHEMA,
        },
      },
    }),
  })

  const json = await res.json() as Record<string, unknown>
  if (!res.ok) {
    const err = (json['error'] as Record<string, unknown>)?.['message'] ?? `HTTP ${res.status}`
    throw new Error(`OpenAI error: ${err}`)
  }

  const text = json['output_text'] as string | null ?? extractOpenAIText(json)
  if (!text) throw new Error('OpenAI response missing output text')

  return JSON.parse(text) as LapAiComment
}

async function callClaude(systemPrompt: string, payload: unknown): Promise<LapAiComment> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY is not set')

  // Dynamic import keeps the SDK out of the OpenAI bundle path
  const { default: Anthropic } = await import('@anthropic-ai/sdk')
  const client = new Anthropic({ apiKey })

  const response = await client.messages.create({
    model: CLAUDE_MODEL,
    max_tokens: 8096,
    system: systemPrompt,
    messages: [{ role: 'user', content: JSON.stringify(payload) }],
    tools: [
      {
        name: 'lap_comment',
        description: 'Return the structured lap analysis result',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        input_schema: LAP_COMMENT_SCHEMA as any,
      },
    ],
    tool_choice: { type: 'tool', name: 'lap_comment' },
  })

  const toolBlock = response.content.find((b) => b.type === 'tool_use')
  if (!toolBlock || toolBlock.type !== 'tool_use') {
    throw new Error('Claude did not return a tool_use block')
  }

  return toolBlock.input as LapAiComment
}

// ─── Route handler ─────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  let body: { type?: unknown; payload?: unknown; vehicle?: unknown }

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const { type, payload, vehicle } = body

  if (type !== 'session' && type !== 'lap') {
    return NextResponse.json({ error: 'type must be "session" or "lap"' }, { status: 400 })
  }
  if (!payload || typeof payload !== 'object') {
    return NextResponse.json({ error: 'payload is required' }, { status: 400 })
  }

  const systemPrompt = type === 'session'
    ? sessionPrompt(vehicle as string | undefined)
    : lapPrompt(vehicle as string | undefined)

  try {
    const result = AI_PROVIDER === 'claude'
      ? await callClaude(systemPrompt, payload)
      : await callOpenAI(systemPrompt, payload)

    return NextResponse.json(result)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('[ai-coach]', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
