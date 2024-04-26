import ChatComponent from '../components/Chat'
import { getFullChat } from '@/actions/getFullChat'
import { seeChat } from '@/actions/seeChat'
import { cookies } from 'next/headers'
import checkUser from '@/utils/checkUser'
import { redirect } from 'next/navigation'
import Link from 'next/link'

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
  let OtherUsername
  if (data.id_user1 === IdUser) { UserNumber = 1; OtherUser = data.id_user2; OtherUsername = data.username_2 }
  if (data.id_user2 === IdUser) { UserNumber = 2; OtherUser = data.id_user1; OtherUsername = data.username_1 }

  // Change status to read
  await seeChat(IdChat, UserNumber)

  return (
    <div className=''>
      <div className='bg-brand5 text-brand8 px-4 md:px-20 py-4 fixed top-0 w-full flex justify-between gap-4 text-sm'>
        <Link href='/chats' className='hover:underline underline-offset-2 font-semibold'>
          Ir a chats
        </Link>
        <span>
          {OtherUsername}
        </span>
      </div>
      <ChatComponent history={data.content} IdChat={IdChat} IdUser={IdUser} UserNumber={UserNumber} OtherUser={OtherUser} />
    </div>
  )
}
