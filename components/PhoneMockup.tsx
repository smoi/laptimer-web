import Image from 'next/image'

interface PhoneMockupProps {
  src?: string        // path to real screenshot, e.g. /screenshots/screen-home.png
  alt?: string
  label?: string
  className?: string
}

export default function PhoneMockup({ src, alt = '', label, className = '' }: PhoneMockupProps) {
  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      {/* Phone frame */}
      <div
        className="relative overflow-hidden shadow-2xl"
        style={{
          width: '200px',
          height: '430px',
          borderRadius: '2.2rem',
          border: '2px solid #3d5a3d',
          background: '#111811',
        }}
      >
        {/* Dynamic island / notch */}
        <div
          className="absolute top-3 left-1/2 -translate-x-1/2 z-20 bg-black"
          style={{ width: '72px', height: '20px', borderRadius: '20px' }}
        />

        {/* Screenshot or placeholder */}
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover object-top"
            sizes="200px"
          />
        ) : (
          /* Placeholder until real screenshots are added */
          <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-[#111811]">
            <div className="w-12 h-12 rounded-xl border border-[#2a3d2a] flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="1" y="4" width="18" height="13" rx="2" stroke="#4ade80" strokeWidth="1.5"/>
                <circle cx="10" cy="10.5" r="3" stroke="#4ade80" strokeWidth="1.5"/>
                <path d="M7 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" stroke="#4ade80" strokeWidth="1.5"/>
              </svg>
            </div>
            <p className="text-[9px] text-[#4ade80] font-mono text-center px-4 leading-relaxed opacity-60">
              Salva screenshot<br/>in public/screenshots/
            </p>
          </div>
        )}

        {/* Side buttons (decorative) */}
        <div className="absolute right-[-2px] top-16 w-[2px] h-10 bg-[#3d5a3d] rounded-full" />
        <div className="absolute left-[-2px] top-14 w-[2px] h-7 bg-[#3d5a3d] rounded-full" />
        <div className="absolute left-[-2px] top-24 w-[2px] h-7 bg-[#3d5a3d] rounded-full" />
      </div>

      {label && (
        <p className="text-xs font-display uppercase tracking-widest text-data">{label}</p>
      )}
    </div>
  )
}
