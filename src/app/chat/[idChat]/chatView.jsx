'use client'

import { sendMessage } from '@/actions/chat'
import useChat from '../useChat'

function ChatView () {
  const { messages, loading } = useChat()
  return (
    <main>
      {loading && <p>Cargando...</p>}
      <ul>
        {messages.map((msg) => (
          <li key={msg.id}>{msg.msg}</li>
        ))}
      </ul>

      <form action={sendMessage}>
        <input type='text' name='msg' />
        <button type='submit'>Enviar</button>
      </form>
    </main>
  )
}

export default ChatView
