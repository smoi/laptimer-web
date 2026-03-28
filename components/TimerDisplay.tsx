'use client'

import { useEffect, useState } from 'react'

const LAP_DURATION = 83456 // 1:23.456

export default function TimerDisplay() {
  const [elapsed, setElapsed] = useState(0)
  const [phase, setPhase] = useState<'running' | 'finished'>('running')

  useEffect(() => {
    let start = Date.now()
    let finished = false

    const tick = () => {
      const now = Date.now()
      const delta = now - start

      if (delta >= LAP_DURATION + 1500) {
        // pause after lap, then reset
        start = Date.now()
        finished = false
        setPhase('running')
        setElapsed(0)
      } else if (delta >= LAP_DURATION) {
        if (!finished) {
          finished = true
          setPhase('finished')
          setElapsed(LAP_DURATION)
        }
      } else {
        setElapsed(delta)
      }
    }

    const id = setInterval(tick, 33)
    return () => clearInterval(id)
  }, [])

  const minutes = Math.floor(elapsed / 60000)
  const seconds = Math.floor((elapsed % 60000) / 1000)
  const millis = elapsed % 1000

  return (
    <div className={`timer-display tabular transition-colors duration-300 ${
      phase === 'finished' ? 'text-amber' : 'text-lap'
    }`}>
      <span className="text-[clamp(3rem,8vw,5.5rem)]">
        {minutes}:{String(seconds).padStart(2, '0')}
      </span>
      <span className="text-[clamp(2rem,5vw,3.5rem)] opacity-80">
        .{String(millis).padStart(3, '0')}
      </span>
    </div>
  )
}
