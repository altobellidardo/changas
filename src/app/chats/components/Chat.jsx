/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useEffect, useState, useRef } from 'react'
import PusherClient from 'pusher-js'
import Form from '../components/Form'
import messages from '@/utils/messages'

export default function ChatComponent ({ history, IdChat, IdUser, UserNumber, OtherUser }) {
  const [totalComments, setTotalComments] = useState(history)
  const bottomRef = useRef(null)

  useEffect(() => {
    scrollToBottom()
    const pusher = new PusherClient(process.env.NEXT_PUBLIC_PUSHER_KEY,
      {
        cluster: 'sa1',
        channelAuthorization: { endpoint: '/api/auth/pusher' }
      })
    const channel = pusher.subscribe(`presence-${IdChat}`)

    channel.bind('pusher:subscription_error', function () {
      alert(messages.error.fail_subscription)
    })

    channel.bind('chat', (data) => {
      setTotalComments((prev) =>
        [...prev, { id_user: data.id_user, message: data.message }]
      )
      scrollToBottom()
    })

    return () => {
      pusher.unsubscribe(`presence-${IdChat}`)
    }
  }, [])

  function scrollToBottom () {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div>
      <div className='my-32'>
        {totalComments.map((item) => (
          <div key={Math.random()}>
            <div className='flex flex-col items-center w-full'>
              <div className={`rounded-lg p-4 mx-2 my-1 ${item.id_user === IdUser ? 'self-end border ' : 'self-start bg-brand7 text-brand8'}`}>
                {item.message}
              </div>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <Form IdChat={IdChat} IdUser={IdUser} history={totalComments} UserNumber={UserNumber} OtherUser={OtherUser} />
    </div>
  )
}
