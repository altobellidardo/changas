'use client'

import { sendEmailDeleteUser } from './action'

async function logOut () {
  await fetch('/api/auth/logout', { method: 'POST' })
}

function DeleteForm ({ user }) {
  async function deleteAccount (formData) {
    await sendEmailDeleteUser(formData)
    await logOut()
    window.location.reload()
  }

  return (
    <form action={deleteAccount} className='flex flex-col w-full max-w-[600px] mx-auto gap-2'>
      <input type='hidden' name='email' value={user.email} />
      <input type='hidden' name='id' value={user.id} />

      <label htmlFor='reason'>Describa la razón de la eliminación de la cuenta</label>
      <input type='text' name='reason' id='reason' className='text-black px-1 py-2 rounded-md border-2' required />
      <button type='submit' className='text-red-600 bg-red-200 border-2 rounded-lg p-2 border-red-600 max-w-[600px] text-center mx-auto'>Eliminar cuenta</button>
    </form>
  )
}

export default DeleteForm
