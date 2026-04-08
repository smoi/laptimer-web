import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const NOTIFY_EMAIL = process.env.BETA_NOTIFY_EMAIL ?? 'support@lapcoach.racing'

export async function POST(req: NextRequest) {
  let body: { email?: string }

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { email } = body

  if (!email) {
    return NextResponse.json({ error: 'Email obbligatoria.' }, { status: 400 })
  }

  try {
    await resend.emails.send({
      from: 'LapCoach <noreply@lapcoach.racing>',
      to: NOTIFY_EMAIL,
      replyTo: email,
      subject: `📬 Nuova iscrizione waitlist — ${email}`,
      html: `
        <div style="font-family: monospace; max-width: 600px; margin: 0 auto; background: #0a0f0a; color: #c8d8c8; padding: 32px; border-radius: 8px;">
          <div style="border-left: 3px solid #f59e0b; padding-left: 16px; margin-bottom: 24px;">
            <h1 style="color: #ffffff; font-size: 20px; margin: 0 0 4px;">Nuova iscrizione waitlist</h1>
            <p style="color: #7aae8a; font-size: 13px; margin: 0;">LapCoach · Notifica lancio</p>
          </div>
          <p style="color: #ffffff; font-size: 16px; margin: 0;">
            <a href="mailto:${email}" style="color: #4ade80;">${email}</a>
          </p>
        </div>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Errore invio email'
    console.error('[waitlist]', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
