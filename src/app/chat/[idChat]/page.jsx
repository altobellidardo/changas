import checkUser from '@/utils/checkUser'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'

import { getChat, seeChat } from '@/actions/chat'

import ChatViewNew from './chatViewNew'

export const dynamic = 'force-dynamic'
async function ChatUsers ({ params }) {
  const { idChat } = params

  const token = cookies().get('token')
  const auth = checkUser(token?.value)
  if (!auth) redirect('/')
  const { id_user: idUser, username } = auth

  const chat = await getChat(idChat)

  if (!chat || (chat.id_user1 !== idUser && chat.id_user2 !== idUser)) {
    redirect('/')
  }

  const userTag = chat.id_user1 === idUser ? 1 : 2
  const otherUser = chat.id_user1 === idUser ? chat.id_user2 : chat.id_user1
  const otherUsername = chat.username_1 === username ? chat.username_2 : chat.username_1

  await seeChat(idChat, userTag)

  return (
    <div>
      <p>hablando con: {otherUsername}</p>
      <Link href={`/perfil/${otherUser}`}>ir al perfil del otro</Link>
      <ChatViewNew idChat={idChat} user1={userTag === 1} />
    </div>
  )
}

export default ChatUsers
