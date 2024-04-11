'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'

export default function Form ({ IdChat, IdUser, IdUser2, Username2, history, UserNumber }) {
  const router = useRouter()
  // This variable will define whether to show or not the contract form to the user
  const [showContractForm, setShowContractForm] = useState(false)

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
          body: JSON.stringify({ message, IdUser, IdUser2, Username2 })
        })
        const { newIdChat } = await res.json()

        // Redirect to the user's char channel
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

  const handlecontract = async (event) => {
    event.preventDefault()

    // Show the contract form
    setShowContractForm(true)
  }

  const handleContractFormSubmit = (event) => {
    event.preventDefault()
    // You can add your logic here
    console.log('Contract form submitted')
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
        <button
          type='contract'
          onClick={handlecontract}
          className='bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-full'
        >
          Contrato
        </button>
        <Link href={`/chats/${IdChat}/contratos`}>Contratos</Link>
      </div>
      {showContractForm && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }}
        >
          <form onSubmit={handleContractFormSubmit}>
            <label>
              Título del contrato:
              <input type='text' name='title' />
            </label>
            <label>
              Descripción del contrato:
              <textarea name='description' />
            </label>
            <input type='submit' value='Proponer contrato' />
          </form>
        </div>
      )}
    </form>
  )
}
