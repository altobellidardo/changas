import checkUser from '@/utils/checkUser'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import Header from '@/components/header/header'
import Footer from '@/components/footer'

import { getExistingChat } from '@/actions/chat'
import Form from './form'

export const dynamic = 'force-dynamic'

async function NuevoChat ({ searchParams }) {
  const token = cookies().get('token')
  const isAuthenticated = checkUser(token?.value)
  if (!isAuthenticated) redirect('/')
  const { id_user: idUser1, username } = isAuthenticated

  const { idUser2, Username2 } = searchParams

  if (idUser1 === idUser2) redirect('/')
  const { idChat, count } = await getExistingChat(idUser1, idUser2)

  if (count >= 1) {
    redirect(`/chat/${idChat}`)
  }

  return (
    <main className='min-h-screen bg-brand1 text-brand8 flex flex-col justify-between'>
      <div>
        <Header />
        <section className='max-w-[80vw] mx-auto my-10 flex flex-col gap-4 items-center'>
          <h1 className='text-2xl'>Chatear con {Username2}</h1>
          <Form user1={{ id: idUser1, username }} user2={{ id: idUser2, username: Username2 }} />
          <p className='text-sm'>Al enviar el formulario se creara un nuevo chat</p>
        </section>
      </div>
      <Footer />
    </main>
  )
}

export default NuevoChat
