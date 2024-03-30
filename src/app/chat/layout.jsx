'use client'

import { WebSocketProvider } from 'next-ws/client'

export default function Layout (p) {
  return (
    <html style={{ fontFamily: 'sans-serif' }}>
      <body style={{ backgroundColor: 'black', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <WebSocketProvider
          url='ws://localhost:3000/api/ws'
        >
          {p.children}
        </WebSocketProvider>
      </body>
    </html>
  )
}
