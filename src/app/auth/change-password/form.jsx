'use client'
import Logo from '@/components/icons/logo'
import Link from 'next/link'
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
    }

    setLoading(false)
  }
  return (
    <main className='flex min-h-screen flex-col bg-brand8'>
      <div className='w-full px-6 py-2.5 bg-brand5 flex justify-between items-center'>
        <Link href='/' className='size-9'>
          <Logo />
        </Link>
      </div>
      <section className='flex flex-col mt-20 justify-center items-center'>
        <h1 className='text-3xl font-bold'>
          Cambiar contraseña
        </h1>

        <form onSubmit={handleSubmit} className='flex flex-col gap-2 w-96 p-6'>
          <label htmlFor='password'>Nueva contraseña</label>
          <input id='password' className='border-2 p-2 rounded' type='password' name='password' autoComplete='password' />
          <button disabled={loading} className='rounded-xl border-2 border-brand6 bg-brand6 px-4 py-2 font-semibold text-brand8 hover:text-brand1 disabled:opacity-50' type='submit'>Registrarse</button>

        </form>
      </section>
    </main>
  )
}

export default FormChangePassword
