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
  const token = cookies().get('token')
  const { id_user: IdUserFromToken } = checkUser(token?.value)

  // Parse the request body to get socketId and channel
  const passedValue = await new Response(req.body).text()
  const content = passedValue.split('&')
  const socketId = content[0].substring(10)
  const channel = content[1].substring(13)

  // Parse query parameters to get user_id
  const url = new URL(req.url)
  const userIdFromQuery = url.searchParams.get('user_id')

  // Use user_id from query params if present, otherwise fallback to token
  const userId = userIdFromQuery || IdUserFromToken
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const presenceData = { user_id: userId }
  const authChannelResponse = pusher.authorizeChannel(socketId, channel, presenceData)

  return NextResponse.json(authChannelResponse)
}
