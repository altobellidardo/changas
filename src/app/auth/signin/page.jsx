'use client'

import Link from 'next/link'
import { useState } from 'react'

function SignIn () {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)
    const email = formData.get('email')
    const password = formData.get('password')

    setLoading(true)
    setError(null)

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    const data = await response.json()

    setLoading(false)

    if (data.error) {
      setError(data.error)
    }

    if (data.message) {
      window.location.href = '/'
    }
  }

  return (
    <section className='flex flex-col mt-20 justify-center items-center'>
      <h1 className='text-3xl font-bold'>
        Iniciar sesión
      </h1>

      <form onSubmit={handleSubmit} className='flex flex-col gap-2 w-80 p-6'>
        <label htmlFor='email'>Email</label>
        <input id='email' className='border-2 p-2 rounded' type='email' name='email' autoComplete='email' />
        <label htmlFor='password'>Contraseña</label>
        <input id='password' className='border-2 p-2 rounded' type='password' name='password' />
        <button disabled={loading} className='rounded-xl border-2 border-brand6 bg-brand6 px-4 py-2 font-semibold text-brand8 hover:text-brand1 disabled:opacity-50' type='submit'>Iniciar sesión</button>
        <span className={`${error ? 'block' : 'hidden'} text-red-600 bg-red-200 border-2 rounded-lg p-2 border-red-600`}>{error}</span>
        <Link href='/auth/signup' className='underline'>
          ¿No tienes una cuenta? Crea una
        </Link>
        <Link href='/auth/forget-password' className='underline'>
          ¿Olvidaste tu contraseña? Recuperala
        </Link>
      </form>
    </section>
  )
}

export default SignIn
