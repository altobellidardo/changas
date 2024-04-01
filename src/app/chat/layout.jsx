import { cookies } from 'next/headers'
import checkUser from '@/utils/checkUser'
import { redirect } from 'next/navigation'

function LayoutChat ({ children }) {
  const token = cookies().get('token')
  const isAuthenticated = checkUser(token?.value)
  if (!isAuthenticated) redirect('/')

  return children
}

export default LayoutChat
