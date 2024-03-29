import { useState, useEffect } from 'react'

function useUrl () {
  const [currentUrl, setCurrentUrl] = useState('')

  useEffect(() => {
    if (process) {
      const url = new URL(window.location.href)
      setCurrentUrl(url.origin)
    }
  }, [])

  return currentUrl
}

export default useUrl
