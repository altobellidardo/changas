import PusherServer from 'pusher'
import { NextResponse } from 'next/server'

const pusher = new PusherServer({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.NEXT_PUBLIC_PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: 'sa1',
  useTLS: true
})

export async function POST (req) {
  // This turns the request into a readable string and to be parsed
  const passedValue = await new Response(req.body).text()
  // The string is splitted when & is found
  const content = passedValue.split('&')
  // We get the socketId and channel by slicing the returned arrays
  const socketId = content[0].substring(10)
  const channel = content[1].substring(13)
  // Authenticate user
  const authResponse = pusher.authorizeChannel(socketId, channel)
  return new NextResponse({ message: authResponse })
}
