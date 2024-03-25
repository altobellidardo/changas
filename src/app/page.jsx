import HomeGuest from '@/components/HomeGuest'
import HomeUser from '@/components/Home'
import checkUser from '@/utils/checkUser'
import { cookies } from 'next/headers'

function HomePage () {
  const token = cookies().get('token')
  const isAuthenticated = checkUser(token?.value)
  console.log(isAuthenticated)

  if (!isAuthenticated) {
    return (<HomeGuest />)
  } else {
    return (<HomeUser />)
  }
}

export default HomePage
