'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'

export default function Form ({ IdChat, IdUser, OtherUser, Username, Username2, history, UserNumber }) {
  const router = useRouter()
  const [enviando, setEnviando] = useState(false)

  const handlemessage = async (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)

    // Retrieve data from formData
    const message = formData.get('message')

    // disable send button
    setEnviando(true)

    if (message === '') return
    // Check if IdChat is not defined to create a new chat
    if (IdChat === undefined) {
      const res = await fetch('/api/chats/create-chat', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ message, IdUser, IdUser2: OtherUser, Username, Username2 })
      })
      const { newIdChat } = await res.json()

      // Redirect to the user's channel
      return router.push(`/chats/${newIdChat}`)
    }

    // Call main POST endpoint where chats are uploaded to Supabase
    await fetch('/api/chats/post-message', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ message, history, IdUser, IdChat, UserNumber })
    })
    const input = event.target.elements.message
    input.value = ''
    setEnviando(false)
  }

  return (
    <form
      onSubmit={handlemessage}
      className='p-2 md:p-6 fixed bottom-0 left-0 w-full bg-brand5'
    >
      <div className='flex flex-col md:flex-row gap-2 md:gap-4'>
        <input
          type='text'
          name='message'
          placeholder='Escribe algo para enviar...'
          className='flex-grow py-2 px-4 outline-brand8 rounded-xl bg-brand3 hover:outline focus:outline-2 text-brand8'
        />
        <button
          type='submit'
          disabled={enviando}
          className='bg-brand3 hover:outline text-brand8 py-1 px-2 md:py-2 md:px-4 rounded-full disabled:opacity-50'
        >
          Enviar
        </button>

        <div className='flex gap-2 md:block'>
          <Link
            href={{ pathname: `/chats/${IdChat}/nuevocontrato`, query: { IdUser, OtherUser, IdChat } }}
            className='bg-brand3 hover:outline text-white py-2 px-4 rounded-full'
          >
            Crear contrato
          </Link>
          <Link
            href={{ pathname: `/chats/${IdChat}/contratos`, query: { IdUser, OtherUser, IdChat } }}
            className='bg-brand3 hover:outline text-white py-2 px-4 rounded-full'
          >
            Contratos
          </Link>
        </div>
      </div>
    </form>
  )
}
