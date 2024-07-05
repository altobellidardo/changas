/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { getMessages, sendMessage } from '@/actions/chat'
import createClient from '@/libs/supabase/client'
import { useState, useEffect } from 'react'

function ChatPage () {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)

  function handleNewMessage (payload) {
    setMessages((messages) => [...messages, payload.new])
  }

  useEffect(() => {
    const supabase = createClient()

    getMessages()
      .then((data) => setMessages(data))
      .finally(() => setLoading(false))

    supabase
      .channel('chat')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chat-test' }, handleNewMessage)
      .subscribe()
  }, [])

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

export default ChatPage
