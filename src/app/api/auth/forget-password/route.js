import { NextResponse } from 'next/server'
import messages from '@/utils/messages'
import supabase from '@/libs/supabase/server'
import { Resend } from 'resend'
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
  const token = jwt.sign(user, process.env.JWT_SECRET)

  const forgetUrl = `${BASE_URL}/auth/change-password?token=${token}`
  const resend = new Resend(process.env.RESEND_KEY)

  await resend.emails.send({
    from: 'support@changas.site',
    to: email,
    subject: 'Password reset',
    html: `<p>Click <a href="${forgetUrl}">here</a> to reset your password</p>`
  })

  return NextResponse.json({ message: messages.success.mail_sent }, { status: 200 })
}
