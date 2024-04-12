/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import UpIcon from '@/components/icons/UpIcon'

function Contract () {
  const searchParams = useSearchParams()
  // Get IDs of users in the chat
  const IdUser = searchParams.get('IdUser')
  const OtherUser = searchParams.get('OtherUser')

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [userType, setUserType] = useState(null)
  const [categories, setCategories] = useState([])

  const handleUserTypeChange = (event) => {
    const elementId = event.target.id
    setUserType(elementId)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)
    const category = formData.get('category')
    const jobtitle = formData.get('jobtitle')
    const date = formData.get('date')
    const budget = formData.get('budget')
    const description = formData.get('description')
    const payformat = formData.get('payformat')

    const sendData = { userType, IdUser, OtherUser, category, jobtitle, date, budget, description, payformat }

    setLoading(true)
    setError(null)

    const response = await fetch('/api/auth/upload-job', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sendData)
    })
    const data = await response.json()

    setLoading(false)

    if (data.error) setError(data.error)
    if (data.message) window.location.href = '/perfil'
  }

  useEffect(() => {
    const fetchJobs = async () => {
      if (userType === null) return { categories: [] }

      let sendData = userType === 'worker' ? OtherUser : IdUser
      if (userType === 'worker') { sendData = IdUser }
      if (userType === 'contractor') { sendData = OtherUser }

      const response = await fetch(`/api/getjobs?id_user=${sendData}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        cache: 'no-store'
      })
      const { categories } = await response.json()
      setCategories(categories)
    }

    fetchJobs()
  }, [userType])

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-2 w-96 p-6'>
      <p>¿Vas a ofrecer un servicio o solicitarlo?</p>
      <div className='flex items-center'>
        <input
          type='radio' id='worker' name='usertype' value='worker'
          className='form-radio h-5 w-5 text-blue-600' onChange={handleUserTypeChange}
        />
        <label className='ml-2' htmlFor='worker'>Ofrezco</label>
      </div>
      <div className='flex items-center'>
        <input
          type='radio' id='contractor' name='usertype' value='contractor'
          className='form-radio h-5 w-5 text-blue-600' onChange={handleUserTypeChange}
        />
        <label className='ml-2' htmlFor='contractor'>Solicito</label>
      </div>
      {
        categories.length === 0
          ? (
            <p className='flex'>
              <UpIcon />
              Seleccione el tipo de contrato
            </p>
            )
          : (
            <>
              <label htmlFor='category' className='border-2 p-2 rounded'>Elige el tipo de trabajo:</label>
              <select name='category' id='category'>
                {
                  categories.map((item) => (
                    <option value={item.category} key={item.category}>
                      {item.category}
                    </option>
                  ))
                }
              </select>
            </>
            )
      }
      <label htmlFor='jobtitle'>Título del trabajo</label>
      <input id='jobtitle' className='border-2 p-2 rounded' type='jobtitle' name='jobtitle' />
      <label htmlFor='description'>Descripción del trabajo</label>
      <input id='description' className='border-2 p-2 rounded' type='description' name='description' />
      <label htmlFor='budget'>Presupuesto</label>
      <input id='budget' className='border-2 p-2 rounded' type='budget' name='budget' />
      <label htmlFor='date'>Fecha del trabajo</label>
      <input id='date' className='border-2 p-2 rounded' type='date' name='date' min={new Date().toISOString().split('T')[0]} />
      <p>Medio de pago</p>
      <div className='flex items-center'>
        <input type='radio' id='changas' name='payformat' value='changas' className='form-radio h-5 w-5 text-blue-600' />
        <label className='ml-2' htmlFor='changas'>Changas</label>
      </div>
      <div className='flex items-center'>
        <input type='radio' id='other' name='payformat' value='other' className='form-radio h-5 w-5 text-blue-600' />
        <label className='ml-2' htmlFor='other'>Otros medios</label>
      </div>
      <button disabled={loading} className='rounded-xl border-2 border-brand6 bg-brand6 px-4 py-2 font-semibold text-brand8 hover:text-brand1 disabled:opacity-50' type='submit'>Subir contrato</button>
      <span className={`${error ? 'block' : 'hidden'} text-red-600 bg-red-200 border-2 rounded-lg p-2 border-red-600`}>{error}</span>
    </form>
  )
}

export default Contract
