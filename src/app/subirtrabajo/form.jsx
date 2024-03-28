'use client'

import { useState } from 'react'

function UploadWorker ({ IdUser, categories, username }) {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)
    const category = formData.get('category')
    const hourlyPrice = formData.get('hourlyPrice')
    const attentionHours = formData.get('attentionHours')
    const location = formData.get('location')
    const employees = formData.get('employees')
    const description = formData.get('description')

    setLoading(true)
    setError(null)

    const sendData = { category, IdUser, hourlyPrice, attentionHours, username, location, employees, description }

    const response = await fetch('/api/auth/upload-job', {
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
    <form onSubmit={handleSubmit} className='flex flex-col gap-2 w-96 p-6'>
      <label htmlFor='category' className='border-2 p-2 rounded'>Elige un tipo de trabajo:</label>
      <select name='category' id='category'>
        {
          categories.map((item) => (
            <option value={item.name} key={item.name}>{item.name}</option>
          ))
        }
      </select>
      <label htmlFor='hourlyPrice'>Precio por hora</label>
      <input id='hourlyPrice' className='border-2 p-2 rounded' type='hourlyPrice' name='hourlyPrice' />
      <label htmlFor='attentionHours'>Horas de atención</label>
      <input id='attentionHours' className='border-2 p-2 rounded' type='attentionHours' name='attentionHours' />
      <label htmlFor='location'>Ubicación</label>
      <input id='location' className='border-2 p-2 rounded' type='location' name='location' />
      <label htmlFor='employees'>Número de empleados</label>
      <input id='employees' className='border-2 p-2 rounded' type='employees' name='employees' />
      <label htmlFor='description'>Descripción del trabajo</label>
      <input id='description' className='border-2 p-2 rounded' type='description' name='description' />
      <button disabled={loading} className='rounded-xl border-2 border-brand6 bg-brand6 px-4 py-2 font-semibold text-brand8 hover:text-brand1 disabled:opacity-50' type='submit'>Subir trabajo</button>
      <span className={`${error ? 'block' : 'hidden'} text-red-600 bg-red-200 border-2 rounded-lg p-2 border-red-600`}>{error}</span>
    </form>
  )
}

export default UploadWorker
