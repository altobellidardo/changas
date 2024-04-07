'use client'

import { useState } from 'react'
import Link from 'next/link'

function UploadUser () {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)
    const email = formData.get('email')
    const password = formData.get('password')
    const name = formData.get('name')
    const surname = formData.get('surname')
    const country = formData.get('country')
    const province = formData.get('province')
    const city = formData.get('city')
    const phone = formData.get('phone')
    const birth = formData.get('birth')
    const dni = formData.get('dni')

    // Validate and return accurate location
    const locationResponse = await fetch('/api/geo/get-location', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ city, province, country })
    })
    const unstrucResponse = await locationResponse.json()
    const location = unstrucResponse.city + ', ' + unstrucResponse.province + ', ' + unstrucResponse.country

    const sendData = { email, password, name, surname, location, phone, birth, dni }

    setLoading(true)
    setError(null)

    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sendData)
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

  // Get the 18 year old date
  const today = new Date()
  const minBirth = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate())
  const minBirthdate = minBirth.toISOString().split('T')[0]

  return (
    <section className='flex flex-col mt-20 justify-center items-center'>
      <h1 className='text-3xl font-bold'>
        Registrarse
      </h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-2 w-80 md:w-96 p-6'>
        <label htmlFor='email'>Email</label>
        <input id='email' className='border-2 p-2 rounded' type='email' name='email' autoComplete='email' />
        <label htmlFor='password'>Contraseña</label>
        <input id='password' className='border-2 p-2 rounded' type='password' name='password' />
        <label htmlFor='name'>Nombre</label>
        <input id='name' className='border-2 p-2 rounded' type='text' name='name' />
        <label htmlFor='surname'>Apellido</label>
        <input id='surname' className='border-2 p-2 rounded' type='text' name='surname' />
        <label htmlFor='country'>País</label>
        <input id='country' className='border-2 p-2 rounded' type='country' name='country' />
        <label htmlFor='province'>Provincia</label>
        <input id='province' className='border-2 p-2 rounded' type='province' name='province' />
        <label htmlFor='city'>Ciudad</label>
        <input id='city' className='border-2 p-2 rounded' type='city' name='city' />
        <label htmlFor='dni'>DNI (sin puntos ni comas)</label>
        <input id='dni' className='border-2 p-2 rounded' type='number' min='1' step='1' name='dni' />
        <label htmlFor='birth'>Fecha de nacimiento</label>
        <input id='birth' className='border-2 p-2 rounded' type='date' name='birth' max={minBirthdate} />
        <label htmlFor='phone'>Telefóno celular (opcional)</label>
        <input id='phone' className='border-2 p-2 rounded' type='number' min='1' step='1' name='phone' />
        <label htmlFor='picture'>Foto de perfil</label>
        <input id='picture' className='border-2 p-2 rounded' type='file' name='picture' />
        <button disabled={loading} className='rounded-xl border-2 border-brand6 bg-brand6 px-4 py-2 font-semibold text-brand8 hover:text-brand1 disabled:opacity-50' type='submit'>Registrarse</button>
        <span className={`${error ? 'block' : 'hidden'} text-red-600 bg-red-200 border-2 rounded-lg p-2 border-red-600`}>{error}</span>
        <Link href='/auth/signin' className='underline'>¿Ya tienes una cuenta?, inicia sesión</Link>
      </form>
    </section>
  )
}

export default UploadUser
