import { getFullChat } from '@/actions/chat'
import Messages from './messages'
import ChatForm from './form'

async function ChatViewNew ({ idChat, user1, data }) {
  const chat = await getFullChat(idChat)
  const { idUser, otherUser, otherUsername } = data

  return (
    <section>
      <Messages data={chat} user1={user1} idChat={idChat} />

      <ChatForm idChat={idChat} user1={user1} idUser={idUser} otherUser={otherUser} otherUsername={otherUsername} />
    </section>
  )
}

export default ChatViewNew
