import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// Email dove ricevere le candidature beta
const NOTIFY_EMAIL = process.env.BETA_NOTIFY_EMAIL ?? 'support@lapcoach.racing'

export async function POST(req: NextRequest) {
  let body: Record<string, string>

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { name, email, vehicle_type, vehicle_model, circuits, has_timer, how_found } = body

  // Validazione campi obbligatori
  if (!name || !email || !vehicle_type || !vehicle_model || !circuits || !has_timer) {
    return NextResponse.json({ error: 'Campi obbligatori mancanti.' }, { status: 400 })
  }

  const hasTimerLabel: Record<string, string> = {
    no: 'No, mai usato',
    app: 'Sì, app sul telefono',
    device: 'Sì, device dedicato',
  }

  const vehicleLabel: Record<string, string> = {
    auto: 'Auto',
    moto: 'Moto',
    entrambi: 'Entrambi',
  }

  try {
    await resend.emails.send({
      from: 'LapCoach Beta <noreply@lapcoach.racing>',
      to: NOTIFY_EMAIL,
      replyTo: email,
      subject: `🏁 Nuova candidatura beta — ${name}`,
      html: `
        <div style="font-family: monospace; max-width: 600px; margin: 0 auto; background: #0a0f0a; color: #c8d8c8; padding: 32px; border-radius: 8px;">
          <div style="border-left: 3px solid #f59e0b; padding-left: 16px; margin-bottom: 24px;">
            <h1 style="color: #ffffff; font-size: 20px; margin: 0 0 4px;">Nuova candidatura beta</h1>
            <p style="color: #7aae8a; font-size: 13px; margin: 0;">LapCoach One · Accesso beta privato</p>
          </div>

          <table style="width: 100%; border-collapse: collapse;">
            ${row('Nome', name)}
            ${row('Email', `<a href="mailto:${email}" style="color: #4ade80;">${email}</a>`)}
            ${row('Veicolo', vehicleLabel[vehicle_type] ?? vehicle_type)}
            ${row('Modello', vehicle_model)}
            ${row('Circuiti', circuits)}
            ${row('Lap timer attuale', hasTimerLabel[has_timer] ?? has_timer)}
            ${how_found ? row('Come ha trovato LapCoach', how_found) : ''}
          </table>

          <div style="margin-top: 24px; padding: 12px 16px; background: #1a2b1a; border-radius: 4px;">
            <p style="color: #7aae8a; font-size: 12px; margin: 0;">
              Rispondi direttamente a questa email per contattare il candidato.
            </p>
          </div>
        </div>
      `,
    })

    // Email di conferma al candidato
    await resend.emails.send({
      from: 'LapCoach Beta <noreply@lapcoach.racing>',
      to: email,
      subject: 'Candidatura beta ricevuta — LapCoach',
      html: `
        <div style="font-family: monospace; max-width: 600px; margin: 0 auto; background: #0a0f0a; color: #c8d8c8; padding: 32px; border-radius: 8px;">
          <div style="border-left: 3px solid #f59e0b; padding-left: 16px; margin-bottom: 24px;">
            <h1 style="color: #ffffff; font-size: 20px; margin: 0 0 4px;">Candidatura ricevuta</h1>
            <p style="color: #7aae8a; font-size: 13px; margin: 0;">LapCoach One · Beta privata</p>
          </div>

          <p style="color: #c8d8c8; font-size: 14px; line-height: 1.6;">
            Ciao ${name},<br><br>
            abbiamo ricevuto la tua candidatura per la beta privata di LapCoach One.
            La valuteremo e ti contatteremo entro <strong style="color: #ffffff;">48 ore</strong>.
          </p>

          <div style="margin: 24px 0; padding: 16px; background: #1a2b1a; border-radius: 4px;">
            <p style="color: #7aae8a; font-size: 12px; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 0.1em;">
              Nel frattempo
            </p>
            <p style="color: #c8d8c8; font-size: 13px; margin: 0; line-height: 1.6;">
              Scarica l'app gratuita — funziona subito con il GPS del tuo telefono,
              senza device. Puoi iniziare a cronometrare i tuoi giri da oggi.
            </p>
            <a href="https://lapcoach.racing/app"
               style="display: inline-block; margin-top: 12px; background: #f59e0b; color: #000; padding: 10px 20px; border-radius: 4px; text-decoration: none; font-weight: bold; font-size: 13px;">
              Scarica l'app →
            </a>
          </div>

          <p style="color: #7aae8a; font-size: 12px; line-height: 1.5;">
            Il team LapCoach<br>
            <a href="mailto:support@lapcoach.racing" style="color: #4ade80;">support@lapcoach.racing</a>
          </p>
        </div>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Errore invio email'
    console.error('[beta-request]', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

function row(label: string, value: string) {
  return `
    <tr>
      <td style="padding: 8px 0; color: #7aae8a; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; width: 160px; vertical-align: top;">
        ${label}
      </td>
      <td style="padding: 8px 0; color: #ffffff; font-size: 14px; border-bottom: 1px solid #1a2b1a; vertical-align: top;">
        ${value}
      </td>
    </tr>
  `
}
