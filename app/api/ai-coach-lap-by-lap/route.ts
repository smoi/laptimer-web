import { NextRequest, NextResponse } from 'next/server'

/**
 * POST /api/ai-coach-lap-by-lap
 *
 * Produces a lap-by-lap coaching report from session data.
 * Reuses AI_PROVIDER, OPENAI_API_KEY, ANTHROPIC_API_KEY from the environment.
 *
 * ── Request body ────────────────────────────────────────────────────────────
 * {
 *   track               : string    // circuit name
 *   vehicle             : string    // e.g. "Porsche 911 GT3 991.2"
 *   language            : string    // e.g. "it", "en", "fr"
 *   session_best_ms     : number
 *   theoretical_best_ms : number
 *   laps: [{
 *     lap           : number
 *     lap_time_ms   : number
 *     delta_ms      : number        // vs session best, positive = slower
 *     outlier       : boolean       // true = pit/incident, skip deep analysis
 *     sectors       : [{ sector: number, ms: number, delta_ms: number }]
 *     top_speed_kmh : number
 *     brake_zones   : [{ zone: string, entry_kmh: number, exit_kmh: number, delta_vs_best_m: number }]
 *   }]
 * }
 *
 * ── Response (200 OK) ────────────────────────────────────────────────────────
 * { "report": "<markdown string>" }
 *
 * ── Errors ──────────────────────────────────────────────────────────────────
 * 400  missing required fields
 * 502  AI API error
 * 504  timeout (> 30s)
 */

const AI_PROVIDER = (process.env.AI_PROVIDER ?? 'openai') as 'openai' | 'claude'
const OPENAI_MODEL = process.env.OPENAI_MODEL ?? 'gpt-4.1'
const CLAUDE_MODEL = process.env.CLAUDE_MODEL ?? 'claude-sonnet-4-6'

// ─── Types ─────────────────────────────────────────────────────────────────

type Sector = {
  sector: number
  ms: number
  delta_ms: number
}

type BrakeZone = {
  zone: string
  entry_kmh: number
  exit_kmh: number
  delta_vs_best_m: number
}

type Lap = {
  lap: number
  lap_time_ms: number
  delta_ms: number
  outlier: boolean
  sectors: Sector[]
  top_speed_kmh: number
  brake_zones?: BrakeZone[]
}

type RequestBody = {
  track: string
  vehicle: string
  language: string
  session_best_ms: number
  theoretical_best_ms: number
  laps: Lap[]
}

// ─── Prompt builder ────────────────────────────────────────────────────────

function buildSystemPrompt(body: RequestBody): string {
  return `Sei un coach di guida esperto. Analizza questa sessione \
giro per giro su Auto: ${body.vehicle} a ${body.track}.

I delta sono tutti calcolati vs session best finale.
Positivo = più lento del best, zero = è il best lap.
Esprimi sempre i tempi in formato m:ss.mmm, i delta in secondi.
Giri con outlier:true sono pit stop o incidenti: \
citali brevemente ma non analizzarli tecnicamente.

Per ogni giro NON outlier produci esattamente questo blocco:

## Giro {N} — {tempo} — {delta con segno in secondi}

**Settori**
S1: {tempo} ({delta con segno}s) · S2: {tempo} ({delta}s) · S3: {tempo} ({delta}s)
Settore critico: {settore con delta peggiore} — {causa probabile in max 10 parole}

**Frenate**
Per ogni brake_zone: "{zone}: entrata {entry}→uscita {exit} km/h{, -Xm se delta_vs_best_m > 5}"
Se delta_vs_best_m > 10 aggiungi "(⚠ frenata anticipata)"

**Giudizio**
Una riga sola: cosa ha funzionato e cosa no in questo giro.

---

Dopo tutti i giri aggiungi:

## Pattern ricorrenti
Problemi tecnici che compaiono in 3+ giri. Massimo 3 punti.
Formato: "**{zona/settore}**: {problema} — presente in giri {N,N,N}"
Questi sono i veri obiettivi strutturali della sessione.

Traduci l'intero report nella lingua: ${body.language}`
}

// ─── Provider calls (text output) ─────────────────────────────────────────

async function callOpenAIText(systemPrompt: string, userContent: string): Promise<string> {
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
        { role: 'user', content: userContent },
      ],
    }),
  })

  const json = await res.json() as Record<string, unknown>
  if (!res.ok) {
    const err = (json['error'] as Record<string, unknown>)?.['message'] ?? `HTTP ${res.status}`
    throw new Error(`OpenAI error: ${err}`)
  }

  // Try output_text shorthand first, then dig into the output array
  const text =
    (json['output_text'] as string | undefined) ??
    (() => {
      try {
        const output = json['output'] as Array<Record<string, unknown>>
        const content = output?.[0]?.['content'] as Array<Record<string, unknown>>
        return content?.[0]?.['text'] as string
      } catch { return undefined }
    })()

  if (!text) throw new Error('OpenAI response missing output text')
  return text
}

async function callClaudeText(systemPrompt: string, userContent: string): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY is not set')

  const { default: Anthropic } = await import('@anthropic-ai/sdk')
  const client = new Anthropic({ apiKey })

  const response = await client.messages.create({
    model: CLAUDE_MODEL,
    max_tokens: 8096,
    system: systemPrompt,
    messages: [{ role: 'user', content: userContent }],
  })

  const block = response.content.find((b) => b.type === 'text')
  if (!block || block.type !== 'text') throw new Error('Claude returned no text block')
  return block.text
}

// ─── Validation ────────────────────────────────────────────────────────────

function validate(body: unknown): body is RequestBody {
  if (!body || typeof body !== 'object') return false
  const b = body as Record<string, unknown>
  return (
    typeof b['track'] === 'string' && b['track'].length > 0 &&
    typeof b['vehicle'] === 'string' && b['vehicle'].length > 0 &&
    typeof b['language'] === 'string' && b['language'].length > 0 &&
    typeof b['session_best_ms'] === 'number' &&
    typeof b['theoretical_best_ms'] === 'number' &&
    Array.isArray(b['laps']) && (b['laps'] as unknown[]).length > 0
  )
}

// ─── Route handler ─────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  if (!validate(body)) {
    return NextResponse.json(
      { error: 'Missing required fields: track, vehicle, language, session_best_ms, theoretical_best_ms, laps' },
      { status: 400 },
    )
  }

  const systemPrompt = buildSystemPrompt(body)
  const userContent = JSON.stringify({
    session_best_ms: body.session_best_ms,
    theoretical_best_ms: body.theoretical_best_ms,
    laps: body.laps,
  })

  console.log('[ai-coach-lap-by-lap] ── request ────────────────────')
  console.log('[ai-coach-lap-by-lap] provider  :', AI_PROVIDER)
  console.log('[ai-coach-lap-by-lap] track     :', body.track)
  console.log('[ai-coach-lap-by-lap] vehicle   :', body.vehicle)
  console.log('[ai-coach-lap-by-lap] language  :', body.language)
  console.log('[ai-coach-lap-by-lap] laps      :', body.laps.length)
  console.log('[ai-coach-lap-by-lap] ──────────────────────────────────')

  try {
    const report = AI_PROVIDER === 'claude'
      ? await callClaudeText(systemPrompt, userContent)
      : await callOpenAIText(systemPrompt, userContent)

    console.log('[ai-coach-lap-by-lap] done — chars:', report.length)
    return NextResponse.json({ report })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('[ai-coach-lap-by-lap]', message)
    return NextResponse.json({ error: message }, { status: 502 })
  }
}
