'use client'

import { postData } from '../action'

export default function Form ({ IdChat }) {
  const handlesubmit = async (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)
    await postData(formData, IdChat)

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
