/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react'
import PusherClient from 'pusher-js'
import messages from '@/utils/messages'

const PUSHER_KEY = process.env.NEXT_PUBLIC_PUSHER_KEY

function useChat (IdChat, history) {
  const [totalComments, setTotalComments] = useState(history)
  const bottomRef = useRef(null)

  function scrollToBottom () {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
    const pusher = new PusherClient(
      PUSHER_KEY,
      { cluster: 'sa1', channelAuthorization: { endpoint: '/api/auth/pusher' } }
    )
    const channel = pusher.subscribe(`presence-${IdChat}`)

    channel.bind('pusher:subscription_error', () => {
      alert(messages.error.fail_subscription)
    })

    channel.bind('chat', (data) => {
      setTotalComments((prev) =>
        [...prev, { id_user: data.id_user, message: data.message }]
      )
      scrollToBottom()
    })

    return () => pusher.unsubscribe(`presence-${IdChat}`)
  }, [])

  return [totalComments, bottomRef]
}

export default useChat
