import { BASE_URL } from '@/constants'

function ValidationPage () {
  async function formAction (formData) {
    'use server'

    await fetch(BASE_URL + '/api/validation', {
      method: 'POST',
      body: formData
    })
  }

  return (
    <form action={formAction} className='flex flex-col'>
      <input type='text' name='name' className='border-2 p-2 rounded' />
      <input type='file' accept='image/png' name='photo' />
      <button type='submit' className='border-2 p-2 rounded'>Enviar</button>
    </form>
  )
}

export default ValidationPage
