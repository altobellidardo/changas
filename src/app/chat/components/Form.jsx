'use client'

import { useRouter } from 'next/navigation'
import { postData } from '../action'
import { createChat } from '@/actions/createChat'

export default function Form ({ IdChat, IdUser1, IdUser2 }) {
  const router = useRouter()
  const handlesubmit = async (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)
    if (IdChat === undefined) {
      const newIdChat = await createChat(formData, IdUser1, IdUser2)
      return router.push(`/chat/${newIdChat}`)
    }
    await postData(formData, IdChat, IdUser1, IdUser2)

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
