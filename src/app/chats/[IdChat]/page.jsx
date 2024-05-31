import ChatComponent from '../components/Chat'
import { getFullChat } from '@/actions/getFullChat'
import { seeChat } from '@/actions/seeChat'
import { cookies } from 'next/headers'
import checkUser from '@/utils/checkUser'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import BackArrowIcon from '@/components/icons/BackArrow'

export const dynamic = 'force-dynamic'

export default async function Chathomepage ({ params }) {
  const { IdChat } = params

  const token = cookies().get('token')
  const { id_user: IdUser, username } = checkUser(token?.value)

  const data = await getFullChat(IdChat)

  if ((data.id_user1 !== IdUser) & (data.id_user2 !== IdUser)) {
    return redirect('/')
  }

  const UserNumber = data.id_user1 === IdUser ? 1 : 2
  const OtherUser = data.id_user1 === IdUser ? data.id_user2 : data.id_user1
  const OtherUsername = data.username_1 === username ? data.username_2 : data.username_1

  // Change status to read
  await seeChat(IdChat, UserNumber)

  return (
    <main>
      <section className='bg-brand5 text-brand8 px-4 md:px-20 py-4 fixed top-0 w-full text-sm'>
        <div className='max-w-[1200px] mx-auto flex justify-between items-center'>
          <Link href='/chats' className='hover:outline p-1 rounded'>
            <BackArrowIcon className='inline-block mr-2' />
          </Link>

          <Link href={`/perfil/${OtherUser}`} className='hover:underline'>
            {OtherUsername}
          </Link>
        </div>
      </section>

      <ChatComponent history={data.content} IdChat={IdChat} IdUser={IdUser} UserNumber={UserNumber} OtherUser={OtherUser} OtherUsername={OtherUsername} />
    </main>
  )
}
