'use client'

import ShareIcon from '@/components/icons/ShareIcon'
import useUrl from '@/hooks/useUrl'
import { useState } from 'react'

function ShareProfile ({ IdUser }) {
  const [coping, setCoping] = useState(false)
  const baseUrl = useUrl()

  const copyToClipboard = () => {
    const url = baseUrl + '/perfil/' + IdUser
    navigator.clipboard.writeText(url)
    setCoping(true)
    setTimeout(() => {
      setCoping(false)
    }, 2000)
  }

  const handleClick = () => {
    copyToClipboard()
  }

  return (
    <button
      className='ml-2 md:ml-0 border-2 border-brand6 hover:bg-brand6 bg-brand6/20 px-2 py-1 rounded-xl flex gap-4 w-fit'
      onClick={handleClick}
    >
      <ShareIcon />
      {coping ? 'Enlace copiado' : 'Comparte el perfil'}
    </button>
  )
}

export default ShareProfile
