/* eslint-disable @next/next/no-img-element */
import convertToLocal from '@/utils/convertToLocal'
import { getPicFromId } from '@/utils/picture'
import Link from 'next/link'

async function ChatCard ({ info, IdUser }) {
  let lastMessageDate = new Date(info.last_message)
  lastMessageDate = convertToLocal(lastMessageDate)
  const day = lastMessageDate.getDate()
  const month = lastMessageDate.getMonth() + 1
  const year = lastMessageDate.getFullYear()
  const lastMessageStr = `${day}/${month}/${year}`

  const isUser1 = info.id_user1 === IdUser

  const otherId = isUser1 ? info.id_user2 : info.id_user1
  const picURL = await getPicFromId(otherId)

  const visto = isUser1 ? info.read_user_1 : info.read_user_2

  return (
    <Link
      key={info.id_chat}
      className='block w-full px-2 py-8 border-b-2 last:border-0 border-brand5 hover:bg-brand2/20 group'
      href={`/chat/${info.id_chat}`}
    >
      <div className='flex justify-between items-center gap-2 max-w-[600px] mx-auto'>
        <img src={picURL} alt={info.username_1} className='size-20 rounded-full object-cover' />
        <div className='flex flex-col'>
          <span className='font-semibold group-hover:underline'>
            {isUser1 ? info.username_2 : info.username_1}
          </span>
          <span>
            Último mensaje {lastMessageStr}
          </span>
        </div>
        <div>{info.open_contract ? 'Contrato pendiente' : 'No hay contratos'}</div>
        <div>{visto ? 'Visto' : 'Nuevo mensaje'}</div>
      </div>
    </Link>
  )
}

export default ChatCard
