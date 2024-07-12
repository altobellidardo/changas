import checkUser from '@/utils/checkUser'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { getChat, seeChat } from '@/actions/chat'

export const dynamic = 'force-dynamic'
async function ChatUsers ({ params }) {
  const { idChat } = params

  const token = cookies().get('token')
  const auth = checkUser(token?.value)
  if (!auth) redirect('/')
  const { id_user: idUser, username } = auth

  const chat = getChat(idChat)
  // if (!chat || (chat.id_user_1 !== idUser && chat.id_user_2 !== idUser)) {
  //   redirect('/')
  // }

  const userTag = chat.id_user1 === idUser ? 1 : 2
  const otherUser = chat.id_user1 === idUser ? chat.id_user2 : chat.id_user1
  const otherUsername = chat.username_1 === username ? chat.username_2 : chat.username_1

  await seeChat(idChat, userTag)

  return (
    <div>page {idChat} {username} {idUser}
      {!chat && <p>no hay chay</p>}
      {chat.id_user_1 === idUser && <p>sos user1</p>}
      {chat.id_user_2 === idUser && <p>sos user2</p>}
      {chat.id_user_1 !== idUser && chat.id_user_2 !== idUser && <p>no sos ni user1 ni user2</p>}

      {otherUser} {otherUsername}
    </div>
  )
}

export default ChatUsers
