'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'

export default function Form ({ IdChat, IdUser, OtherUser, Username, Username2, history, UserNumber }) {
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
    <>
      <section className={open ? 'block' : 'hidden'}>
        <div className='flex gap-2'>
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
      </section>
      <form
        onSubmit={handlemessage}
        className='p-2 md:p-6 bg-brand5 flex gap-1 fixed bottom-0 left-0 w-screen justify-center'
      >
        <input
          type='text'
          name='message'
          placeholder='escribe aquí...'
          className='p-2 outline-brand8 rounded-xl bg-brand3 hover:outline focus:outline-2 text-brand8 w-[90%] max-w-[1200px]'
        />
        <button
          type='submit'
          disabled={enviando}
          className='bg-brand3 hover:outline text-brand8 py-1 px-2 md:py-2 md:px-4 rounded-xl disabled:opacity-50'
        >
          Enviar
        </button>
        <button type='button' className='bg-brand3 hover:outline text-brand8 py-1 px-2 md:py-2 md:px-4 rounded-xl' onClick={() => setOpen(!open)}>
          <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='icon icon-tabler icons-tabler-outline icon-tabler-arrow-up'><path stroke='none' d='M0 0h24v24H0z' fill='none' /><path d='M12 5l0 14' /><path d='M18 11l-6 -6' /><path d='M6 11l6 -6' /></svg>
        </button>
      </form>
    </>
  )
}
