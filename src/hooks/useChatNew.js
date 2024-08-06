import createClient from '@/libs/supabase/client'
import { useEffect, useState, useRef } from 'react'

function useChat (data, idChat) {
  const [chat, setChat] = useState(data)
  const supabase = createClient()
  const bottomRef = useRef(null)

  function scrollToBottom () {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  function handleMessages (payload) {
    setChat((chat) => [...chat, payload.new])
    scrollToBottom()
  }

  useEffect(() => {
    const listener = supabase
      .channel('chats')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages', filters: { id_chat: idChat } },
        handleMessages
      )
      .subscribe()

    scrollToBottom()

    return () => {
      supabase.removeChannel(listener)
    }
  }, [])

  return { chat, bottomRef }
}

export default useChat
