/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useEffect, useState, useRef } from 'react'
import PusherClient from 'pusher-js'
import Form from '../components/Form'
import messages from '@/utils/messages'

export default function ChatComponent ({ history, IdChat, IdUser, UserNumber }) {
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

    channel.bind('pusher:subscription_error', function (status) {
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
      <div className='p-6 flex-grow max-h-screen overflow-y-auto py-32'>
        <div className='flex flex-col gap-4'>
          {totalComments.map((item) => (
            <div key={Math.random()}>

              <div className='flex items-center'>
                <div className='rounded-lg bg-white p-4 shadow-md self-start'>
                  {item.message}
                </div>
              </div>

              <p className='font-light text-sm text-gray-600'>
                {item.id_user === IdUser ? 'Tu' : item.id_user}
              </p>

            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      </div>
      <Form IdChat={IdChat} IdUser={IdUser} history={totalComments} UserNumber={UserNumber} />
    </div>

  )
}
