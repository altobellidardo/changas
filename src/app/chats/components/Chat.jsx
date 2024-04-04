/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useEffect, useState, useRef } from 'react'
import Pusher from 'pusher-js'

export default function ChatComponent ({ data, IdChat }) {
  const [totalComments, setTotalComments] = useState(data)
  const bottomRef = useRef(null)

  useEffect(() => {
    scrollToBottom()
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: 'sa1',
      channelAuthorization: { endpoint: '/api/auth/pusher-auth/channel-auth.js' }
    })

    const channel = pusher.subscribe(`presence-${IdChat}`)

    channel.bind('chat', (data) => {
      setTotalComments((prev) =>
        [...prev, { id_user: data.id_user, message: data.message }]
      )
      scrollToBottom()
    })

    return () => {
      pusher.unsubscribe(IdChat)
    }
  }, [])

  function scrollToBottom () {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
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
              {item.id_user}
            </p>

          </div>
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  )
}
