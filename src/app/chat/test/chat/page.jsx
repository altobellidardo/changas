import { redirect } from 'next/navigation'
import Form from '../components/Form'
import ChatComponent from '../components/Chat'
import { cookies } from 'next/headers'
import checkUser from '@/utils/checkUser'
import { getMessages } from '@/actions/getMessages'

// Add
export const dynamic = 'force-dynamic'

export default async function Chathomepage () {
  const token = cookies().get('token')
  const isAuthenticated = checkUser(token?.value)
  if (!isAuthenticated) redirect('/')
  const data = await getMessages()

  return (
    <div className='h-screen bg-gray-200 flex flex-col'>
      <ChatComponent data={data} />
      <Form />
    </div>
  )
}
