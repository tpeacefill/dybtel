import { useState, useEffect } from 'react'

export function useProfileRotation(intervalMs: number = 3000) {
  const [activeProfile, setActiveProfile] = useState(1) // 0: yellow, 1: red (default center), 2: green

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveProfile((prev) => (prev + 1) % 3)
    }, intervalMs)
    return () => clearInterval(interval)
  }, [intervalMs])

  return activeProfile
}
