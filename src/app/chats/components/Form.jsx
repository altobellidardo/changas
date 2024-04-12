'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Form ({ IdChat, IdUser, OtherUser, Username2, history, UserNumber }) {
  const router = useRouter()

  const handlemessage = async (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)

    // Retrieve data from formData
    const message = formData.get('message')
    if (message !== '') {
    // Check if IdChat is not defined to create a new chat
      if (IdChat === undefined) {
        const res = await fetch('/api/chats/create-chat', {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify({ message, IdUser, IdUser2: OtherUser, Username2 })
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
    }
    const input = event.target.elements.message
    input.value = ''
  }

  return (
    <form
      onSubmit={handlemessage}
      className='p-6 fixed bottom-0 left-0 w-full bg-white'
    >
      <div className='flex'>
        <input
          type='text'
          name='message'
          placeholder='Escribe algo para enviar...'
          className='flex-grow py-2 px-4 outline-none'
        />
        <button
          type='submit'
          className='bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-full'
        >
          Enviar
        </button>
        <Link href={{ pathname: `/chats/${IdChat}/nuevocontrato`, query: { IdUser, OtherUser, IdChat } }} className='bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-full'>Crear contrato</Link>
      </div>
    </form>
  )
}
