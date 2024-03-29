'use client'

import { useState } from 'react'

function FormChangePassword ({ token }) {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)

    const password = e.target.password.value

    const sendingData = { token, password }
    const response = await fetch('/api/auth/change-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sendingData)
    })
    const data = await response.json()

    if (data.error) {
      alert(data.error)
    }
    if (data.message) {
      alert(data.message)
      window.location.href = '/auth/signin'
    }

    setLoading(false)
  }
  return (
    <section className='flex flex-col mt-20 justify-center items-center'>
      <h1 className='text-2xl md:text-3xl font-bold'>
        Cambiar contraseña
      </h1>

      <form onSubmit={handleSubmit} className='flex flex-col gap-2 w-80 p-6'>
        <label htmlFor='password'>Nueva contraseña</label>
        <input id='password' className='border-2 p-2 rounded' type='password' name='password' autoComplete='password' />
        <button disabled={loading} className='rounded-xl border-2 border-brand6 bg-brand6 px-4 py-2 font-semibold text-brand8 hover:text-brand1 disabled:opacity-50' type='submit'>Cambiar</button>

      </form>
    </section>
  )
}

export default FormChangePassword
