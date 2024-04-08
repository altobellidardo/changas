'use client'

import { useRouter } from 'next/navigation'

export default function Form ({ IdChat, IdUser, IdUser2, Username2, history }) {
  const router = useRouter()
  const handlesubmit = async (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)

    // Retrieve data from formData
    const message = formData.get('message')

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
      body: JSON.stringify({ message, history, IdUser, IdChat })
    })

    const input = event.target.elements.message
    input.value = ''
  }

  return (
    <form
      onSubmit={handlesubmit}
      className='p-6 fixed bottom-0 left-0 w-full bg-white'
    >
      <div className='flex'>
        <input
          type='text'
          name='message'
          placeholder='Type your message...'
          className='flex-grow py-2 px-4 outline-none'
        />
        <button
          type='submit'
          className='bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-full'
        >
          Send
        </button>
      </div>
    </form>
  )
}
