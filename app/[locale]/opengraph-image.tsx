import { ImageResponse } from 'next/server'

export const runtime = 'edge'
export const alt = 'LapCoach — GPS Lap Timer for cars and motorcycles on track'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const COPY = {
  it: {
    label: 'GPS LAP TIMER · AUTO & MOTO',
    tagline: 'Il tuo coach in pista',
    sub: 'App gratuita · iOS e Android · GPS 20Hz con device opzionale',
  },
  en: {
    label: 'GPS LAP TIMER · CARS & MOTORCYCLES',
    tagline: 'Your coach on track',
    sub: 'Free app · iOS and Android · 20Hz GPS with optional device',
  },
} as const

export default async function OpenGraphImage({
  params,
}: {
  params: { locale: string }
}) {
  const locale = (params.locale === 'en' ? 'en' : 'it') as keyof typeof COPY
  const copy = COPY[locale]

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#080d08',
          backgroundImage:
            'radial-gradient(circle at 25% 20%, rgba(74, 222, 128, 0.12), transparent 55%), radial-gradient(circle at 80% 90%, rgba(245, 158, 11, 0.18), transparent 55%)',
          padding: '72px 80px',
          fontFamily: 'sans-serif',
          color: '#ffffff',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            width: 6,
            background:
              'linear-gradient(to bottom, transparent, #F59E0B, transparent)',
            opacity: 0.7,
          }}
        />

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              marginBottom: 28,
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                backgroundColor: '#F59E0B',
              }}
            />
            <span
              style={{
                color: '#F59E0B',
                fontSize: 22,
                letterSpacing: 6,
                fontWeight: 700,
              }}
            >
              {copy.label}
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              fontSize: 200,
              fontWeight: 900,
              letterSpacing: -6,
              lineHeight: 0.9,
              textTransform: 'uppercase',
            }}
          >
            <span>Lap</span>
            <span style={{ color: '#F59E0B' }}>Coach</span>
          </div>

          <div
            style={{
              marginTop: 24,
              fontSize: 46,
              fontWeight: 700,
              color: '#ffffff',
              letterSpacing: -1,
              textTransform: 'uppercase',
            }}
          >
            {copy.tagline}
          </div>

          <div
            style={{
              marginTop: 16,
              fontSize: 26,
              color: '#7aae8a',
              maxWidth: 900,
            }}
          >
            {copy.sub}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid #1e2b1e',
            paddingTop: 24,
          }}
        >
          <div style={{ display: 'flex', gap: 28 }}>
            <Stat value="20Hz" label="GPS" />
            <Stat value="<1m" label={locale === 'en' ? 'ACCURACY' : 'PRECISIONE'} />
            <Stat value="€59" label="DEVICE" />
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 28,
              fontWeight: 700,
              color: '#4ade80',
              letterSpacing: 2,
            }}
          >
            lapcoach.racing
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <span
        style={{
          fontSize: 34,
          fontWeight: 900,
          color: '#F59E0B',
          lineHeight: 1,
        }}
      >
        {value}
      </span>
      <span
        style={{
          fontSize: 16,
          color: '#7aae8a',
          letterSpacing: 3,
          marginTop: 4,
        }}
      >
        {label}
      </span>
    </div>
  )
}
