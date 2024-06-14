/* eslint-disable @next/next/no-img-element */
'use client'

import checkCredentials from '@/utils/checkCredentials'
import { get18YearsAgo } from '@/utils/getDate'
import messages from '@/utils/messages'
import Link from 'next/link'
import { useState } from 'react'

function Input ({ type, name, label, noRequired, ...rest }) {
  return (
    <label className='flex flex-col'>
      {label}
      <input type={type} name={name} className='border-2 p-2 rounded' {...rest} required={!noRequired} />
    </label>
  )
}

const errorMatch = [
  [['name', 'surname'], messages.error.name_required],
  [['city', 'province', 'country'], messages.error.location_required],
  [['email'], messages.error.email_required],
  [['password'], messages.error.password_required],
  [['birthdate'], messages.error.birth_required],
  [['dni'], messages.error.dni_invalid]
]

function RegisterForm () {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const [imageFile, setImageFile] = useState(null)

  const minBirthdate = get18YearsAgo()

  const handleSubmit = async (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)
    const fields = ['name', 'surname', 'email', 'password', 'country', 'province', 'city', 'dni', 'birthdate', 'image']
    const data = Object.fromEntries(fields.map(field => [field, formData.get(field)]))

    setLoading(true)
    setError(null)

    for (const [key, value] of Object.entries(data)) {
      if (value === '' || (key === 'dni' && value?.length !== 8)) {
        setError(errorMatch.find((error) => error[0].includes(key))[1])
        setLoading(false)
      }
    }

    const credentialsValidation = checkCredentials(data.email, data.password)
    if (credentialsValidation.error) {
      setError(credentialsValidation.error)
      setLoading(false)
    }

    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: data
    })
    const dataResponse = await response.json()

    setLoading(false)

    if (dataResponse.error) {
      setError(dataResponse.error)
    }
    if (dataResponse.message) {
      window.location.href = '/'
    }
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    setImageFile(file)
  }

  const deleteImage = () => {
    setImageFile(null)
    // delete file from form
    document.getElementById('image').value = ''
  }

  return (
    <section className='flex flex-col mt-20 justify-center items-center'>
      <h1 className='text-3xl font-bold'>Registrarse</h1>
      <form className='flex flex-col gap-4 w-80 md:w-96 p-6' onSubmit={handleSubmit}>
        <Input type='text' name='name' label='Nombre' />
        <Input type='text' name='surname' label='Apellido' />
        <Input type='email' name='email' label='Email' />
        <Input type='password' name='password' label='Contraseña' />

        <Input type='text' name='country' label='País' />
        <Input type='text' name='province' label='Provincia' />
        <Input type='text' name='city' label='Ciudad' />

        <Input type='number' name='dni' label='DNI (sin puntos ni comas)' min='1' step='1' />
        <Input type='date' name='birth' label='Fecha de nacimiento' max={minBirthdate} />
        <Input type='number' name='phone' label='Telefóno celular (opcional)' min='1' step='1' noRequired />

        <Input type='file' name='image' label='Imagen de perfil (opcional)' accept='image/*' onChange={handleImageChange} id='image' />
        {imageFile &&
          <div>
            <img src={URL.createObjectURL(imageFile)} alt='Imagen de perfil' className='w-40 h-40 object-cover' />
            <button className='rounded px-2 py-1 text-black bg-red-500/40' type='button' onClick={deleteImage} noRequired>
              Descartar imagen
            </button>
          </div>}

        <button
          disabled={loading}
          className='rounded-xl border-2 border-brand6 bg-brand6 px-4 py-2 font-semibold text-brand8 hover:text-brand1 disabled:opacity-50'
          type='submit'
        > Registrarse
        </button>
        {error &&
          <span className='text-red-600 bg-red-200 border-2 rounded-lg p-2 border-red-600'>{error}</span>}
        <Link href='/auth/signin' className='underline'>¿Ya tienes una cuenta? Inicia sesión</Link>
      </form>
    </section>
  )
}

export default RegisterForm
