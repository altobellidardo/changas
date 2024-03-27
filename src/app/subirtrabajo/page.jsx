'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import Logo from '@/components/icons/logo'
import { useSearchParams } from 'next/navigation'
import { getCategories } from '@/actions/getCategories'
import { getUser } from '@/actions/getUser'

function UploadJob () {
  // Retrieve user ID from the query
  const IdUser = useSearchParams().get('user')

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const [username, setUsername] = useState(undefined)

  // Get existing categories
  useEffect(() => {
    const fetchCategories = async () => {
      const result = await getCategories()
      setCategories(result)
    }

    fetchCategories()
  }, [])

  // Get user's username
  useEffect(() => {
    const fetchUsername = async () => {
      let result = await getUser(IdUser)
      result = result.name + ' ' + result.surname
      setUsername(result)
    }

    fetchUsername()
  })

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

    const response = await fetch('/api/auth/upload-job', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ IdUser, category, hourlyPrice, attentionHours, location, employees, username, description })
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
    <main className='flex min-h-screen flex-col bg-brand8'>
      <div className='w-full px-6 py-2.5 bg-brand5 flex justify-between items-center'>
        <Link href='/' className='size-9'>
          <Logo />
        </Link>
      </div>
      <section className='flex flex-col mt-20 justify-center items-center'>
        <h1 className='text-3xl font-bold'>
          Subir experiencia laboral
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
      </section>
    </main>
  )
}

export default UploadJob
