import { useState, useEffect } from 'react'

function useDelay(value, delay) {
  const [delayValue, setDelayValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => setDelayValue(value), delay)

    return () => clearTimeout(handler)
  }, [value])

  return delayValue
}

export default useDelay
