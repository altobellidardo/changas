import HomeGuest from '@/components/HomeGuest'
import HomeUser from '@/components/Home'
import checkUser from '@/utils/checkUser'
import { cookies } from 'next/headers'
import Header from '@/components/header/header'
import Footer from '@/components/footer'

function HomePage () {
  const token = cookies().get('token')
  const isAuthenticated = checkUser(token?.value)

  return (
    <main className='min-h-screen bg-brand8'>
      <Header />
      {
        isAuthenticated
          ? (<HomeUser IdUser={isAuthenticated.id_user} />)
          : (<HomeGuest />)
      }
      <Footer />
    </main>
  )
}

export default HomePage
