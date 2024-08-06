import { getUserChats } from '@/actions/getUserChats'
import ChatCard from './chatCard'

async function ChatsList ({ idUser }) {
  const userChats = await getUserChats(idUser)

  return (
    <section className='my-4 md:my-10 flex-grow'>
      {userChats.length === 0
        ? (
          <div className='flex flex-col items-center'>
            <span className='text-black font-bold text-xl py-10'>
              No has iniciado ninguna conversación
            </span>
          </div>
          )
        : userChats.map(item =>
          <ChatCard key={item.id_chat} info={item} IdUser={idUser} />
        )}
    </section>
  )
}

export default ChatsList
