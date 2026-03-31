'use client'

import { useEffect } from 'react'

function moveWidgetToFooter() {
  const widget = document.querySelector('.iub__us-widget')
  const footer = document.getElementById('site-footer')
  if (!widget || !footer) return
  // Already inside footer — nothing to do
  if (footer.contains(widget)) return
  footer.prepend(widget)
}

export default function IubendaLoader() {
  useEffect(() => {
    // Move widget immediately if already in DOM
    moveWidgetToFooter()

    // Watch for iubenda inserting the widget after SPA navigation
    const observer = new MutationObserver(() => {
      moveWidgetToFooter()
    })
    observer.observe(document.body, { childList: true, subtree: false })

    return () => observer.disconnect()
  }, [])

  return null
}
