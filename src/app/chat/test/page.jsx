import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import checkUser from '@/utils/checkUser'

export default async function Home () {
  const token = cookies().get('token')
  const isAuthenticated = checkUser(token?.value)
  if (!isAuthenticated) redirect('/')

  return (
    <div className='max-w-xl mx-auto border rounded-lg p-10 mt-32'>
      <h1 className='text-4xl font-semibold text-center'>Bienvenido al chat...</h1>
    </div>
  )
}
