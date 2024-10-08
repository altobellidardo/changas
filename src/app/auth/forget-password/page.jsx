'use client'

import Link from 'next/link'
import { useState } from 'react'

function ForgetPassword () {
  const [loading, setLoading] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)

    const email = e.target.email.value
    const response = await fetch('/api/auth/forget-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email
      })
    })
    const data = await response.json()

    if (data.error) {
      alert(data.error)
    }
    if (data.message) {
      alert(data.message)
    }

    setLoading(false)
  }
  return (
    <section className='flex flex-col mt-20 justify-center items-center'>
      <h1 className='text-3xl font-bold'>
        Recuperar cuenta
      </h1>

      <form onSubmit={handleSubmit} className='flex flex-col gap-2 w-80 p-6'>
        <label htmlFor='email'>Email</label>
        <input id='email' className='border-2 p-2 rounded' type='email' name='email' autoComplete='email' />
        <button disabled={loading} className='rounded-xl border-2 border-brand6 bg-brand6 px-4 py-2 font-semibold text-brand8 hover:text-brand1 disabled:opacity-50' type='submit'>
          Enviar enlace de recuperación
        </button>

      </form>
      {/* <Link href='/auth/signup' className='underline'>¿No tienes una cuenta?, crea una</Link> */}
      <Link href='/auth/signin' className='underline'>¿Ya tienes una cuenta?, inicia sesión</Link>
    </section>
  )
}

export default ForgetPassword
