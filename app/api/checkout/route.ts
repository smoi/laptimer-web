import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
  apiVersion: '2024-06-20',
})

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, address, city, postal, country } = body

    if (!name || !email || !address || !city || !postal || !country) {
      return NextResponse.json(
        { error: 'Tutti i campi sono obbligatori.' },
        { status: 400 }
      )
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'LapCoach One',
              description: 'GPS lap timer 20Hz con BLE per moto da pista. App iOS & Android gratuita inclusa.',
              images: [],
              metadata: {
                sku: 'LAPCOACH-ONE-V1',
              },
            },
            unit_amount: 5900, // €69.00 in cents
          },
          quantity: 1,
        },
      ],
      customer_email: email,
      shipping_address_collection: {
        allowed_countries: ['IT', 'DE', 'FR', 'ES', 'CH', 'AT', 'BE', 'NL', 'PT', 'GB'],
      },
      metadata: {
        customer_name: name,
        shipping_address: address,
        shipping_city: city,
        shipping_postal: postal,
        shipping_country: country,
      },
      success_url: `${BASE_URL}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${BASE_URL}/shop`,
      locale: 'it',
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Stripe checkout error:', err)
    const message = err instanceof Error ? err.message : 'Errore durante la creazione del pagamento.'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
