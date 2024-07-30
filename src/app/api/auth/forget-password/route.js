import { NextResponse } from 'next/server'
import messages from '@/utils/messages'
import supabase from '@/libs/supabase/server'
import { sendEmail } from '@/libs/resend/email'
import jwt from 'jsonwebtoken'

export async function POST (req) {
  const url = new URL(req.url)
  const BASE_URL = url.origin

  const body = await req.json()
  const { email } = body

  if (!email) {
    return NextResponse.json(
      { error: messages.error.email_required }, { status: 400 }
    )
  }

  const { data: user } = await supabase.from('users').select('*').eq('email', email).single()

  if (!user) {
    return NextResponse.json(
      { error: messages.error.user_not_found }, { status: 404 }
    )
  }
  user.password = undefined
  const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '180d' })

  const forgetUrl = `${BASE_URL}/auth/change-password?token=${token}`

  await sendEmail({
    from: 'equipo@changasred.com',
    to: email,
    subject: 'Password reset',
    html: `<p>Haz clic <a href="${forgetUrl}">aqui</a> para restablecer tu contraseña</p>`
  })

  return NextResponse.json({ message: messages.success.mail_sent }, { status: 200 })
}
