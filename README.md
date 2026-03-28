# LapCoach Web

Landing page per LapCoach — GPS lap timer per moto da pista.

**Stack:** Next.js 14 · Tailwind CSS · TypeScript · Stripe

---

## Setup

### 1. Installa le dipendenze

```bash
npm install
```

### 2. Configura le variabili d'ambiente

```bash
cp .env.local.example .env.local
```

Modifica `.env.local` con le tue chiavi:

```env
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

Per i test, usa le chiavi **test** dal tuo [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys).

### 3. Avvia il server di sviluppo

```bash
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000).

---

## Struttura

```
app/
├── page.tsx          → Home (/)
├── app/page.tsx      → Pagina App (/app)
├── shop/page.tsx     → Shop (/shop)
├── thank-you/        → Conferma ordine (/thank-you)
└── api/checkout/     → Stripe Checkout API

components/
├── Navbar.tsx        → Navbar sticky
├── Footer.tsx        → Footer
├── TimerDisplay.tsx  → Timer animato live (client)
├── PhoneMockup.tsx   → Mockup telefono CSS
└── ProductCard.tsx   → Card prodotto con spec
```

---

## Deploy su Vercel

1. Fai push su GitHub
2. Importa il repo su [vercel.com](https://vercel.com)
3. Aggiungi le variabili d'ambiente nel pannello Vercel:
   - `STRIPE_SECRET_KEY` → chiave segreta Stripe (live o test)
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` → chiave pubblica Stripe
   - `NEXT_PUBLIC_BASE_URL` → URL del tuo dominio (es. `https://lapcoach.it`)

### Passare a Stripe Live

Per attivare i pagamenti reali:
1. Vai su [Stripe Dashboard → API Keys](https://dashboard.stripe.com/apikeys)
2. Sostituisci le chiavi `sk_test_...` con `sk_live_...` e `pk_test_...` con `pk_live_...`
3. Rideploy su Vercel

---

## Personalizzazione

### Aggiungere link App Store / Google Play

Cerca le occorrenze `href="#"` in `app/page.tsx` e `app/app/page.tsx` e sostituisci con i link reali.

### Cambiare prezzo

Il prezzo è definito in due posti:
- UI: `app/shop/page.tsx` — testo `€69`
- Stripe: `app/api/checkout/route.ts` — `unit_amount: 6900` (centesimi)

### Aggiungere immagini reali del device

Sostituisci le `DeviceSVG` in `components/ProductCard.tsx` e `app/shop/page.tsx` con `<Image>` da `next/image`.

---

## Comandi

```bash
npm run dev      # Sviluppo locale
npm run build    # Build di produzione
npm run start    # Avvia build di produzione
npm run lint     # Linting ESLint
```
