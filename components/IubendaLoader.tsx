'use client'

import { useEffect } from 'react'

function moveWidgetToSlot() {
  const widget = document.querySelector('.iub__us-widget') as HTMLElement | null
  const slot = document.getElementById('iubenda-slot')
  if (!widget || !slot) return
  if (slot.contains(widget)) return
  // #iubenda-slot uses dangerouslySetInnerHTML so React never reconciles its
  // children — safe to insert external DOM nodes here without removeChild errors.
  slot.appendChild(widget)
}

export default function IubendaLoader() {
  useEffect(() => {
    moveWidgetToSlot()

    const observer = new MutationObserver(() => {
      moveWidgetToSlot()
    })
    observer.observe(document.body, { childList: true, subtree: false })

    return () => observer.disconnect()
  }, [])

  return null
}
