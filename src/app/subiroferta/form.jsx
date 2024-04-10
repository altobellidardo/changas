'use client'

import { useState } from 'react'

function UploadOffert ({ IdUser, categories }) {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)
    const category = formData.get('category')
    const budget = formData.get('budget')
    const country = formData.get('country')
    const province = formData.get('province')
    const city = formData.get('city')
    const description = formData.get('description')

    // Validate and return accurate location
    const locationResponse = await fetch('/api/geo/get-location', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ city, province, country, complete: true })
    })
    const unstrucResponse = await locationResponse.json()
    const location = unstrucResponse.city + ', ' + unstrucResponse.province + ', ' + unstrucResponse.country

    const sendData = { category, IdUser, budget, location, description }

    setLoading(true)
    setError(null)

    const response = await fetch('/api/auth/upload-offer', {
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
      window.location.href = '/perfil'
    }
  }

  return (
    <section className='flex flex-col mt-20 justify-center items-center'>
      <h1 className='text-3xl font-bold'>
        Subir oferta laboral
      </h1>

      <form onSubmit={handleSubmit} className='flex flex-col gap-2 w-96 p-6'>
        <label htmlFor='category' className='border-2 p-2 rounded'>Elige un tipo de trabajo:</label>
        <select name='category' id='category'>
          {
        categories.map((item) => (
          <option value={item.name} key={item.name}>{item.name}</option>
        ))
        }
        </select>
        <label htmlFor='budget'>Presupuesto</label>
        <input id='budget' className='border-2 p-2 rounded' type='budget' name='budget' autoComplete='budget' />
        <label htmlFor='country'>País</label>
        <input id='country' className='border-2 p-2 rounded' type='country' name='country' />
        <label htmlFor='province'>Provincia</label>
        <input id='province' className='border-2 p-2 rounded' type='province' name='province' />
        <label htmlFor='city'>Ciudad</label>
        <input id='city' className='border-2 p-2 rounded' type='city' name='city' />
        <label htmlFor='description'>Descripción del trabajo</label>
        <input id='description' className='border-2 p-2 rounded' type='description' name='description' />
        <button disabled={loading} className='rounded-xl border-2 border-brand6 bg-brand6 px-4 py-2 font-semibold text-brand8 hover:text-brand1 disabled:opacity-50' type='submit'>Subir oferta</button>
        <span className={`${error ? 'block' : 'hidden'} text-red-600 bg-red-200 border-2 rounded-lg p-2 border-red-600`}>{error}</span>
      </form>
    </section>
  )
}

export default UploadOffert
