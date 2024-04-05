// pages/api/pusher/auth.js
import Pusher from 'pusher'
// import { NextResponse } from 'next/server'

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.NEXT_PUBLIC_PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: 'sa1',
  useTLS: true
})

export default function handler (req, res) {
  // 'use server'
  if (req.method === 'POST') {
    const socketId = req.body.socket_id
    const channel = req.body.channel_name
    // This authenticates every user. Don't do this in production!
    const authResponse = pusher.authorizeChannel(socketId, channel)
    res.status(200).json(authResponse)
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
