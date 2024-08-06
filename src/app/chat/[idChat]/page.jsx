import checkUser from '@/utils/checkUser'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'

import { getChat, seeChat } from '@/actions/chat'

import BackArrowIcon from '@/components/icons/BackArrow'

import ChatViewNew from './chatViewNew'

export const dynamic = 'force-dynamic'
async function ChatUsers ({ params }) {
  const { idChat } = params

  const token = cookies().get('token')
  const auth = checkUser(token?.value)
  if (!auth) redirect('/')
  const { id_user: idUser, username } = auth

  const chat = await getChat(idChat)

  if (!chat || (chat.id_user1 !== idUser && chat.id_user2 !== idUser)) {
    redirect('/')
  }

  const userTag = chat.id_user1 === idUser ? 1 : 2
  const otherUser = chat.id_user1 === idUser ? chat.id_user2 : chat.id_user1
  const otherUsername = chat.username_1 === username ? chat.username_2 : chat.username_1

  await seeChat(idChat, userTag)

  const data = { idUser, otherUser, otherUsername }

  return (
    <main>
      <section className='bg-brand5 text-brand8 px-4 md:px-20 py-4 fixed top-0 w-full text-sm'>
        <div className='max-w-[1200px] mx-auto flex justify-between items-center'>
          <Link href='/chat' className='hover:outline p-1 rounded'>
            <BackArrowIcon className='inline-block mr-2' />
          </Link>

          <Link href={`/perfil/${otherUser}`} className='hover:underline'>
            {otherUsername}
          </Link>
        </div>
      </section>

      <ChatViewNew idChat={idChat} user1={userTag === 1} data={data} />
    </main>
  )
}

export default ChatUsers
