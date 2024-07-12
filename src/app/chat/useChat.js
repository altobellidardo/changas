import { getMessages } from '@/actions/chat'
import createClient from '@/libs/supabase/client'
import { useState, useEffect } from 'react'

function useChat () {
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

  return { messages, loading }
}

export default useChat
