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
  if (data.id_user1 === IdUser) { UserNumber = 1 }
  if (data.id_user2 === IdUser) { UserNumber = 2 }

  // Change status to read
  await seeChat(IdChat, UserNumber)

  return (
    <div className='h-screen bg-gray-200 flex flex-col'>
      <h1>Este es el chat: {IdChat}</h1>
      <ChatComponent history={data.content} IdChat={IdChat} IdUser={IdUser} UserNumber={UserNumber} />
    </div>
  )
}
