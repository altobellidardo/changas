import { createChat } from '@/actions/chat'
import { redirect } from 'next/navigation'

function NuevoChatForm ({ user1, user2 }) {
  async function formAction (formData) {
    'use server'
    const response = await createChat(formData)
    console.log(response, 'from server')
    if (response) redirect(`/chat/${response.idChat}`)
  }

  return (
    <form action={formAction} className='flex flex-col'>
      <input type='hidden' name='data' value={JSON.stringify({ user1, user2 })} />
      <input
        type='text'
        name='message'
        className='p-2 outline-brand8 rounded-t-xl bg-brand3/60 hover:outline focus:outline-2 text-brand8 w-[80vw] max-w-[600px] placeholder:text-brand8'
        placeholder='Escribe un mensaje aqui...'
      />
      <button type='submit' className='bg-brand3/80 hover:outline text-white py-2 px-4 rounded-b-xl'>Crear chat</button>
    </form>
  )
}

export default NuevoChatForm
