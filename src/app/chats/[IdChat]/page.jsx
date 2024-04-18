import ChatComponent from '../components/Chat'
import { getFullChat } from '@/actions/getFullChat'
import { seeChat } from '@/actions/seeChat'
import { cookies } from 'next/headers'
import checkUser from '@/utils/checkUser'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function Chathomepage ({ params }) {
  const { IdChat } = params

  const token = cookies().get('token')
  const { id_user: IdUser } = checkUser(token?.value)

  const data = await getFullChat(IdChat)

  if ((data.id_user1 !== IdUser) & (data.id_user2 !== IdUser)) {
    return redirect('/')
  }

  let UserNumber = 0
  let OtherUser
  if (data.id_user1 === IdUser) { UserNumber = 1; OtherUser = data.id_user2 }
  if (data.id_user2 === IdUser) { UserNumber = 2; OtherUser = data.id_user1 }

  // Change status to read
  await seeChat(IdChat, UserNumber)

  return (
    <div className='flex flex-col'>
      <div className='bg-brand5 text-brand8 px-20 py-4 fixed w-full'>
        Chateando con {OtherUser}
      </div>
      <ChatComponent history={data.content} IdChat={IdChat} IdUser={IdUser} UserNumber={UserNumber} OtherUser={OtherUser} />
    </div>
  )
}
