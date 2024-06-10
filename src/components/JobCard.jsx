'use client'

import { useState } from 'react'
import Link from 'next/link'
import StarIcon from '@/components/icons/Star'
import SwitchMode from './SwitchMode'
import messages from '@/utils/messages'

function JobInfo ({ job }) {
  return (
    <>
      <div>
        <span className='opacity-60 text-sm'>Nombre del oficio</span>
        <p>{job.category}</p>
      </div>
      <div>
        <span className='opacity-60 text-sm'>Precio por hora</span>
        <p>${job.hourly_price}</p>
      </div>
      <div>
        <span className='opacity-60 text-sm'>Ubicación</span>
        <p>{job.location}</p>
      </div>
      <div>
        <span className='opacity-60 text-sm'>Cantidad de empleados</span>
        <p>{job.employees}</p>
      </div>
      <div>
        <span className='opacity-60 text-sm'>Horas de atención</span>
        <p>{job.attention_hours}</p>
      </div>
      <div>
        <span className='opacity-60 text-sm'>Descripción</span>
        <p>{job.description}</p>
      </div>
      <div>
        <span className='opacity-60 text-sm'>Puntaje</span>
        <div className='flex gap-1 text-xl items-center'>
          {job.score}/5
          <StarIcon className='size-5 text-brand5' />
          <Link className='ml-2 rounded-xl bg-brand4 text-brand8 px-4 py-2 text-sm align-middle' href={{ pathname: '/perfil/vercriticas', query: { category: job.category } }}>
            Ver las reseñas
          </Link>
        </div>
      </div>
    </>
  )
}

function JobEdit ({ job, handleSubmit, loading, error }) {
  return (
    <form onSubmit={handleSubmit} className='grid grid-cols-2 gap-x-4 gap-y-2'>
      <p>Oficio</p>
      <p>{job.category}</p>
      <label htmlFor='hourlyPrice'>Precio por hora</label>
      <input type='number' min='0' max='200000000' step='1' name='hourlyPrice' id='hourlyPrice' defaultValue={job.hourly_price} className='text-black p-1 rounded-md' />
      <label htmlFor='country'>País</label>
      <input type='text' name='country' id='country' defaultValue={job.location.split(',')[2]} className='text-black p-1 rounded-md' />
      <label htmlFor='province'>Provincia</label>
      <input type='text' name='province' id='province' defaultValue={job.location.split(',')[1]} className='text-black p-1 rounded-md' />
      <label htmlFor='city'>Ciudad</label>
      <input type='text' name='city' id='city' defaultValue={job.location.split(',')[0]} className='text-black p-1 rounded-md' />
      <label htmlFor='employees'>Cantidad de empleados</label>
      <input type='number' min='1' max='1000' step='1' name='employees' id='employees' defaultValue={job.employees} className='text-black p-1 rounded-md' />
      <label htmlFor='attentionHours'>Horas de atención</label>
      <input type='text' name='attentionHours' id='attentionHours' defaultValue={job.attention_hours} className='text-black p-1 rounded-md' />
      <label htmlFor='description'>Descripción</label>
      <input type='text' name='description' id='description' defaultValue={job.description} className='text-black p-1 rounded-md' />
      <button disabled={loading} className='rounded-xl bg-brand6 px-4 py-2 font-semibold text-brand8 hover:bg-brand2 disabled:opacity-50' type='submit'>
        {loading ? 'Cargando...' : 'Guardar'}
      </button>
      <span className={`${error ? 'block' : 'hidden'} text-red-600 bg-red-200 border-2 rounded-lg p-2 border-red-600`}>{error}</span>
    </form>
  )
}

function JobCard ({ job }) {
  const [editMode, setEditMode] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const toggleEditMode = () => {
    setEditMode(!editMode)
    setError(false)
  }

  const handleSubmit = async (jobdata) => {
    jobdata.preventDefault()
    setLoading(true)
    setError(false)

    if (jobdata.target.hourlyPrice.value === '' || jobdata.target.attentionHours.value === '' || jobdata.target.employees.value === '' || jobdata.target.city.value === '' || jobdata.target.province.value === '' || jobdata.target.country.value === '' || jobdata.target.description.value === '') {
      setError(messages.error.form_field_required)
      setLoading(false)
    } else {
      const sendData = {
        IdWorker: job.id_worker,
        hourly_price: jobdata.target.hourlyPrice.value,
        country: jobdata.target.country.value,
        province: jobdata.target.province.value,
        city: jobdata.target.city.value,
        employees: jobdata.target.employees.value,
        attention_hours: jobdata.target.attentionHours.value,
        description: jobdata.target.description.value
      }

      const response = await fetch('/api/update/worker', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(sendData)
      })
      const data = await response.json()

      if (data.error) setError(data.error)
      else window.location.reload()

      setLoading(false)
    }
  }

  return (
    <li className='p-4 border-2 mb-2 mx-2 rounded-xl border-brand4/40 flex flex-col gap-1'>
      <SwitchMode toggleEditMode={toggleEditMode} editMode={editMode} />
      {editMode
        ? <JobEdit job={job} handleSubmit={handleSubmit} loading={loading} error={error} />
        : <JobInfo job={job} />}
    </li>
  )
}

export default JobCard
