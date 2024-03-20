import { redirect } from 'next/navigation'
import Form from './form'

function ChangePassword (req) {
  const { token } = req.searchParams
  if (!token) {
    redirect('/auth/forget-password')
  }
  return (
    <Form token={token} />
  )
}

export default ChangePassword
