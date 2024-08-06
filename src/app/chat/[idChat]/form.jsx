'use client'

import Link from 'next/link'
import { useState } from 'react'
import UpArrowIcon from '@/components/icons/UpArrow'
import { sendMessage } from '@/actions/chat'

function ChatForm ({ idChat, user1, idUser, otherUser, otherUsername }) {
  const [enviando, setEnviando] = useState(false)
  const [open, setOpen] = useState(false)

  function handlemessage (event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    const message = formData.get('msg')
    setEnviando(true)
    if (message === '') {
      setEnviando(false)
      return
    }
    sendMessage(formData)
    const input = event.target.elements.message
    input.value = ''
    setEnviando(false)
  }

  return (
    <section className='p-2 bg-brand5 flex flex-col gap-1 fixed bottom-0 left-0 w-screen justify-center'>
      <div className={`transition-all ${open ? 'block transition-transform' : 'hidden'}`}>
        <div className='text-brand8 max-w-[1200px] mx-auto flex gap-2 justify-center'>
          <Link
            href={{ pathname: `/chat/${idChat}/nuevocontrato`, query: { IdUser: idUser, OtherUser: otherUser, IdChat: idChat } }}
            className='bg-brand3 hover:outline text-white py-2 px-4 rounded-full'
          >
            Crear contrato
          </Link>
          <Link
            href={{ pathname: `/chat/${idChat}/contratos`, query: { IdUser: idUser, OtherUser: otherUser, OtherUsername: otherUsername, IdChat: idChat } }}
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
            name='msg'
            placeholder='escribe aquí...'
            className='p-2 outline-brand8 rounded-xl bg-brand3 hover:outline focus:outline-2 text-brand8 w-[90%] max-w-[1200px]'
          />
          <input type='hidden' name='data' value={JSON.stringify({ idChat, user1 })} />
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
