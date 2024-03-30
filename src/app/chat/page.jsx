/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useWebSocket } from 'next-ws/client'
import { useCallback, useEffect, useRef, useState } from 'react'

export default function Page () {
  const ws = useWebSocket()

  const [messages, setMessages] = useState([])

  const authorInputRef = useRef(null)
  const contentInputRef = useRef(null)
  const onClick = useCallback(() => {
    const author = authorInputRef.current?.value
    const content = contentInputRef.current?.value
    if (author && content) {
      ws?.send(JSON.stringify({ author, content }))
      contentInputRef.current.value = ''
    }
    setMessages(messages => [...messages, { author: 'You', content }])
  }, [])

  const onMessage = useCallback((event) => {
    event.data.text().then(payload => {
      const message = JSON.parse(payload)
      setMessages(messages => [...messages, message])
    })
  }, [])
  useEffect(() => {
    ws?.addEventListener('message', onMessage)
    return () => ws?.removeEventListener('message', onMessage)
  }, [onMessage, ws])

  return (
    <div style={{ maxWidth: '50vh' }}>
      <div style={{ minHeight: '90vh', position: 'relative' }}>
        {
          messages.map((message, i) => (
            <div key={i}>
              <strong>{message.author}</strong>: {message.content}
            </div>
          ))
        }

        {
          messages.length === 0 &&
            <div style={{ position: 'absolute', left: '0', top: '0', right: '0', bottom: '0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <p style={{ color: 'white' }}>Waiting for messages...</p>
            </div>
        }
      </div>

      <div style={{ display: 'flex' }}>
        <input ref={authorInputRef} style={{ width: '70px' }} type='text' placeholder='Your name' />
        <input ref={contentInputRef} style={{ width: '280px' }} type='text' placeholder='Your message' />
        <button type='button' onClick={onClick}>Send</button>
      </div>
    </div>
  )
}

// export default function Page () {
//   const ws = useWebSocket()

//   function handleClick () {
//     ws?.send(JSON.stringify({ content: 'hola' }))
//   }

//   return (
//     <button onClick={handleClick}>Send</button>
//   )
// }
