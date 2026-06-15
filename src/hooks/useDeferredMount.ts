import { useEffect, useState } from 'react'

export function useDeferredMount(active: boolean) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (!active) {
      setMounted(false)
      return
    }

    const frameId = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(frameId)
  }, [active])

  return mounted
}
