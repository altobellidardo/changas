'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'
import UpArrowIcon from '@/components/icons/UpArrow'

function ChatForm ({ IdChat, IdUser, OtherUser, Username, Username2, history, UserNumber }) {
  const router = useRouter()
  const [enviando, setEnviando] = useState(false)
  const [open, setOpen] = useState(false)

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
        body: JSON.stringify({ message, IdUser, idUser2: OtherUser, Username, Username2 })
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
    <section className='p-2 bg-brand5 flex flex-col gap-1 fixed bottom-0 left-0 w-screen justify-center'>
      <div className={`transition-all ${open ? 'block transition-transform' : 'hidden'}`}>
        <div className='text-brand8 max-w-[1200px] mx-auto flex gap-2 justify-center'>
          <Link
            href={{ pathname: `/chats/${IdChat}/nuevocontrato`, query: { IdUser, OtherUser, IdChat } }}
            className='bg-brand3 hover:outline text-white py-2 px-4 rounded-full'
          >
            Crear contrato
          </Link>
          <Link
            href={{ pathname: `/chats/${IdChat}/contratos`, query: { IdUser, OtherUser, OtherUsername: Username2, idChat: IdChat } }}
            className='bg-brand3 hover:outline text-white py-2 px-4 rounded-full'
          >
            Contratos
          </Link>
        </div>
      </div>
      <div className=''>
        <form
          onSubmit={handlemessage}
          className='p-2 bg-brand5 flex gap-1 max-w-[1200px] justify-center mx-auto'
        >
          <button
            type='button'
            className='bg-brand3 hover:outline text-brand8 py-1 px-2 rounded-xl'
            onClick={() => setOpen(!open)}
            style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
          >
            <UpArrowIcon />
          </button>
          <input
            id='message'
            type='text'
            name='message'
            placeholder='escribe aquí...'
            className='p-2 outline-brand8 rounded-xl bg-brand3 hover:outline focus:outline-2 text-brand8 w-[90%] max-w-[1200px]'
          />
          <button
            type='submit'
            disabled={enviando}
            className='bg-brand3 hover:outline text-brand8 text-sm py-1 px-2 rounded-xl disabled:opacity-50'
          >
            Enviar
          </button>
        </form>
      </div>
    </section>
  )
}

export default ChatForm
