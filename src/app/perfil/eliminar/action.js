'use server'

import { sendEmail } from '@/libs/resend/email'

export async function sendEmailDeleteUser (formData) {
  const reason = formData.get('reason')
  const email = formData.get('email')
  const id = formData.get('id')

  await sendEmail({
    from: 'equipo@changasred.com',
    to: 'equipo@changasred.com',
    subject: 'Petición de eliminación de cuenta',
    html: `
      <p>Se requiere eliminar la cuenta,
      email: ${email}
      ID: ${id}
      razón: ${reason}</p>`
  })
}
