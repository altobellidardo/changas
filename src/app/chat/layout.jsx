'use client'

import { WebSocketProvider } from 'next-ws/client'

export default function Layout (p) {
  return (
    <WebSocketProvider
      url='ws://localhost:3000/api/ws'
    >
      {p.children}
    </WebSocketProvider>
  )
}
