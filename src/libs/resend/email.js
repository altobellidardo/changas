import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_KEY)

export async function sendEmail (data) {
  return resend.emails.send(data)
}
