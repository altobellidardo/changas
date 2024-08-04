import { NextResponse } from 'next/server'
import { sendEmail } from '@/libs/resend/email'
import messages from '@/utils/messages'

export async function POST (request) {
  const body = await request.json()
  const { IdUser, Username, OtherUser, OtherUsername, subject, description } = body

  await sendEmail({
    from: 'equipo@changasred.com',
    to: 'equipo@changasred.com',
    subject: `Denuncia: ${subject}`,
    html:
    `<p>
      <p>El usuario ${Username} (ID: ${IdUser}) denunció a ${OtherUsername} (ID: ${OtherUser})</p>
      <p>Descripción de la denuncia:</p>
      <p>${description}</p>
    </p>`
  })

  const response = NextResponse.json({ message: messages.success.report_sent }, { status: 200 })

  return response
}
