// pages/api/pusher/auth.js
import PusherServer from 'pusher'
import { NextResponse } from 'next/server'

const pusher = new PusherServer({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.NEXT_PUBLIC_PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: 'sa1',
  useTLS: true
})

export function POST (req) {
  const socketId = req.body.socket_id
  const channel = req.body.channel_name
  console.log(socketId, channel, req.body)
  // Authenticate user
  const authResponse = pusher.authorizeChannel(socketId, channel)
  return new NextResponse({ message: authResponse })
}
