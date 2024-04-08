import PusherServer from 'pusher'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import checkUser from '@/utils/checkUser'

const pusher = new PusherServer({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.NEXT_PUBLIC_PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: 'sa1',
  useTLS: true
})

export async function POST (req) {
  // Get user ID
  const token = cookies().get('token')
  const { id_user: IdUser } = checkUser(token?.value)

  // This turns the request into a readable string and to be parsed
  const passedValue = await new Response(req.body).text()
  // The string is splitted when & is found
  const content = passedValue.split('&')
  // We get the socketId and channel by slicing the returned arrays
  const socketId = content[0].substring(10)
  const channel = content[1].substring(13)

  // Create user data to be appended to the socketId of the user
  const presenceData = { user_id: IdUser, user_info: { name: 'Mr Channels', twitter_id: '@pusher' } }

  // Authenticate user
  const authResponse = pusher.authorizeChannel(socketId, channel, presenceData)
  return new NextResponse({ message: authResponse })
}
