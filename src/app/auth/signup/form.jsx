/* eslint-disable @next/next/no-img-element */
'use client'

import checkCredentials from '@/utils/checkCredentials'
import { get18YearsAgo } from '@/utils/getDate'
import Link from 'next/link'
import { useState } from 'react'
import { errorMatch, getFields } from './dataHelp'
import { loadCities, loadProvinces } from '@/utils/geo'

function Input ({ type, name, label, noRequired, ...rest }) {
  return (
    <label className='flex flex-col'>
      {label}
      <input type={type} name={name} className='border-2 p-2 rounded' {...rest} required={!noRequired} />
    </label>
  )
}

function Select ({ name, label, options, ...rest }) {
  return (
    <label className='flex flex-col'>
      {label}
      <select name={name} className='border-2 p-2 rounded' {...rest}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  )
}

function RegisterForm () {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const [imageFile, setImageFile] = useState(null)

  const provinces = loadProvinces()
  const [province, setProvince] = useState(provinces[0])
  const [city, setCity] = useState(loadCities(province)[0])

  const minBirthdate = get18YearsAgo()

  const handleSubmit = async (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)
    const data = getFields(formData)

    setLoading(true)
    setError(null)

    for (const [key, value] of Object.entries(data)) {
      if (value === '' || (key === 'dni' && value?.length !== 8)) {
        if (key !== 'phone') {
          setError(errorMatch.find((error) => error[0].includes(key))[1])
          setLoading(false)
        }
      }
    }

    const credentialsValidation = checkCredentials(data.email, data.password)
    if (credentialsValidation.error) {
      setError(credentialsValidation.error)
      setLoading(false)
    }

    const response = await fetch('/api/auth/register', {
      method: 'POST',
      body: formData
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

        <Select
          label='Provincia'
          name='province'
          options={provinces}
          onChange={(event) => setProvince(event.target.value)}
        />
        <Select
          label='Ciudad'
          name='city'
          options={loadCities(province)}
          onChange={(event) => setCity(event.target.value)}
        />
        <input type='hidden' name='province' value={province} />
        <input type='hidden' name='city' value={city} />

        <Input type='number' name='dni' label='DNI (sin puntos ni comas)' min='1' step='1' />
        <Input type='date' name='birth' label='Fecha de nacimiento' max={minBirthdate} />
        <Input type='number' name='phone' label='Telefóno celular (opcional)' min='1' step='1' noRequired />

        <Input type='file' name='image' label='Imagen de perfil (opcional)' accept='image/*' onChange={handleImageChange} id='image' noRequired />
        {imageFile &&
          <div>
            <img src={URL.createObjectURL(imageFile)} alt='Imagen de perfil' className='w-40 h-40 object-cover' />
            <button className='rounded px-2 py-1 text-black bg-red-500/40' type='button' onClick={deleteImage}>
              Descartar imagen
            </button>
          </div>}

        <div>
          <input type='checkbox' name='terms' id='terms' required />
          <label className='inline pl-2' htmlFor='terms'>
            Acepto los
            <Link href='/legal/terminos-condiciones' className='underline pl-2'>términos y condiciones</Link>
            , y el
            <Link href='/legal/privacidad' className='underline pl-2'>aviso de privacidad</Link>
          </label>
        </div>

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
