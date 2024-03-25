import { cookies } from 'next/headers'
import checkUser from '@/utils/checkUser'
import Navbar from './Navbar'

function Header () {
  const token = cookies().get('token')
  const isAuthenticated = checkUser(token?.value)

  return (
    <Navbar auth={isAuthenticated} />
  )
}

export default Header
