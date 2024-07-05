'use client'

import { sendMessage } from '@/actions/chat'
import createClient from '@/libs/supabase/client'
import { useState, useEffect } from 'react'

function ChatPage () {
  const supabase = createClient()
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const supabase = createClient()

    async function subscribeChat () {
      await supabase
        .channel(
          'chat',
          {
            config: {
              
            }
          }
        )
    }
  }, [])

  return (
    <main>
      <ul>
        {messages.map((msg) => (
          <li key={msg.id}>{msg.msg}</li>
        ))}
        <li>message</li>
      </ul>

      <form action={sendMessage}>
        <input type='text' />
        <button type='submit'>Enviar</button>
      </form>
    </main>
  )
}

export default ChatPage
