import Form from '../components/Form'
import ChatComponent from '../components/Chat'
import { getFullChat } from '@/actions/getFullChat'
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

  return (
    <div className='h-screen bg-gray-200 flex flex-col'>
      <h1>Este es el chat: {IdChat}</h1>
      <ChatComponent data={data.content} IdChat={IdChat} />
      <Form IdChat={IdChat} IdUser={IdUser} />
    </div>
  )
}
