import convertToLocal from '@/utils/convertToLocal'
import Link from 'next/link'

function ChatCard ({ info, IdUser }) {
  let lastMessageDate = new Date(info.last_message)
  lastMessageDate = convertToLocal(lastMessageDate)
  const day = lastMessageDate.getDate()
  const month = lastMessageDate.getMonth() + 1
  const year = lastMessageDate.getFullYear()
  const lastMessageStr = `${day}/${month}/${year}`

  const visto = info.id_user1 === IdUser ? info.read_user_1 : info.read_user_2

  return (
    <Link
      key={info.id_chat}
      className='block w-full px-2 py-8 border-b-2 last:border-0 border-brand5 hover:bg-brand2/20 group'
      href={`/chat/${info.id_chat}`}
    >
      <div className='flex justify-between items-center gap-2 max-w-[600px] mx-auto'>
        <div className='size-16 rounded-full bg-brand5' />
        <div className='flex flex-col'>
          <span className='font-semibold group-hover:underline'>
            {info.id_user1 === IdUser ? info.username_2 : info.username_1}
          </span>
          <span>
            Último mensaje {lastMessageStr}
          </span>
          <span>id chat : {info.id_chat}</span>
        </div>
        <div>{info.open_contract ? 'Contrato pendiente' : 'No hay contratos'}</div>
        <div>{visto ? 'Visto' : 'No visto'}</div>
      </div>
    </Link>
  )
}

export default ChatCard
