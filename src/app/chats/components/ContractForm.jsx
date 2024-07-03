/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import UpIcon from '@/components/icons/UpIcon'
import Tooltip from '@/components/ui/Tooltip'
import Link from 'next/link'
import messages from '@/utils/messages'

function ContractForm () {
  const searchParams = useSearchParams()
  // Get IDs of users in the chat
  const IdUser = searchParams.get('IdUser')
  const OtherUser = searchParams.get('OtherUser')
  const IdChat = searchParams.get('IdChat')

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [userType, setUserType] = useState(null)
  const [categories, setCategories] = useState([])

  // Get today's date in correct format
  let today = new Date()
  const dd = String(today.getDate()).padStart(2, '0')
  const mm = String(today.getMonth() + 1).padStart(2, '0')
  const yyyy = today.getFullYear()
  today = yyyy + '-' + mm + '-' + dd

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
    const payformat = false // formData.get('payformat') THERE IS NO CHANGAS PAY!!

    setLoading(true)
    setError(null)

    if (category === null || jobtitle === '' || date === '' || budget === '' || description === '' || payformat === null) {
      setError(messages.error.form_field_required)
      setLoading(false)
    } else {
      const sendData = {
        userType,
        IdUser,
        OtherUser,
        category,
        jobtitle,
        date,
        budget,
        description,
        payformat
      }

      const response = await fetch('/api/forms/post-contract', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(sendData)
      })
      setLoading(false)
      const data = await response.json()

      if (data.error) setError(data.error)
      if (data.status === 200) window.location.href = `/chats/${IdChat}`
    }
  }

  useEffect(() => {
    const fetchJobs = async () => {
      if (userType === null) return { categories: [] }

      let sendData = userType === 'worker' ? OtherUser : IdUser
      if (userType === 'worker') { sendData = IdUser }
      if (userType === 'contractor') { sendData = OtherUser }

      const response = await fetch(`/api/get-jobs?id_user=${sendData}`, {
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
    <form onSubmit={handleSubmit} className='flex flex-col gap-10 w-[90vw] max-w-[500px] p-6 mx-auto my-10'>
      <Link href={`/chats/${IdChat}`} className='text-brand1 hover:underline w-fit'>Volver</Link>
      <div className='flex flex-col gap-2'>
        <p>¿Vas a ofrecer un servicio o solicitarlo?</p>
        <div className='flex items-center'>
          <input
            type='radio' id='worker' name='usertype' value='worker'
            className='form-radio size-6 text-blue-600' onChange={handleUserTypeChange}
          />
          <label className='ml-2' htmlFor='worker'>Ofrezco</label>
        </div>
        <div className='flex items-center'>
          <input
            type='radio' id='contractor' name='usertype' value='contractor'
            className='form-radio size-6 text-blue-600' onChange={handleUserTypeChange}
          />
          <label className='ml-2' htmlFor='contractor'>Solicito</label>
        </div>
        {categories.length === 0 &&
          <p className='flex mt-2'>
            <UpIcon />
            Seleccione el tipo de contrato
          </p>}
      </div>

      {categories.length > 0 &&
        <div>
          <label htmlFor='category' className='block'>Elige el tipo de trabajo:</label>
          <select name='category' id='category' className='border-2 p-2 rounded w-full'>
            {
              categories.map((item) => (
                <option value={item.category} key={item.category}>
                  {item.category}
                </option>
              ))
            }
          </select>
        </div>}

      <div>
        <label htmlFor='jobtitle' className='block'>Título del trabajo</label>
        <input id='jobtitle' className='border-2 p-2 rounded w-full' type='jobtitle' name='jobtitle' />
      </div>

      <div>
        <label htmlFor='description' className='block'>Descripción del trabajo</label>
        <textarea name='description' id='description' className='border-2 p-2 rounded w-full' />
      </div>

      <div>
        <label htmlFor='budget' className='block'>Presupuesto</label>
        <input id='budget' className='border-2 p-2 rounded w-full' type='number' step='1' min='1' name='budget' />
      </div>

      <div>
        <label htmlFor='date' className='block'>Fecha del trabajo</label>
        <input id='date' className='border-2 p-2 rounded w-full' type='date' name='date' min={today} />
      </div>

      {/* <div>
        <p>Medio de pago</p>
        <div className='flex items-center'>
          <input type='radio' id='changas' name='payformat' value='changas' className='form-radio h-5 w-5 text-blue-600' />
          <label className='ml-2' htmlFor='changas'>Changas</label>
        </div>
        <div className='flex items-center'>
          <input type='radio' id='other' name='payformat' value='other' className='form-radio h-5 w-5 text-blue-600' />
          <label className='ml-2' htmlFor='other'>Otros medios</label>
        </div>
      </div> */}

      <div className='relative group'>
        <button
          disabled={loading}
          className='rounded-xl border-2 border-brand6 bg-brand6 px-4 py-2 font-semibold text-brand8 hover:text-brand1 disabled:opacity-50 relative z-10'
          type='submit'
        >
          Subir contrato
        </button>
        <Tooltip text='Los contratos son confidenciales y habilitan a las reseñas' />
      </div>

      <span className={`${error ? 'block' : 'hidden'} text-red-600 bg-red-200 border-2 rounded-lg p-2 border-red-600`}>{error}</span>
    </form>
  )
}

export default ContractForm
