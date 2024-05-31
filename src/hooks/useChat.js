/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react'
import PusherClient from 'pusher-js'
import messages from '@/utils/messages'

function useChat (history, IdChat) {
  function scrollToBottom () {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const [totalComments, setTotalComments] = useState(history)
  const bottomRef = useRef(null)

  useEffect(() => {
    scrollToBottom()
    const pusher = new PusherClient(
      process.env.NEXT_PUBLIC_PUSHER_KEY,
      { cluster: 'sa1', channelAuthorization: { endpoint: '/api/auth/pusher' } }
    )
    const channel = pusher.subscribe(`presence-${IdChat}`)

    channel.bind('pusher:subscription_error', () => {
      alert(messages.error.fail_subscription)
    })

    channel.bind('chat', (data) => {
      setTotalComments((prev) =>
        [...prev, { user_num: data.user_num, message: data.message }]
      )
      scrollToBottom()
    })

    return () => pusher.unsubscribe(`presence-${IdChat}`)
  }, [])

  return [totalComments, bottomRef]
}

export default useChat
