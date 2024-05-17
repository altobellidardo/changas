'use client'

import { useState } from 'react'
import PenIcon from './icons/PenIcon'
import Link from 'next/link'
import StarIcon from '@/components/icons/Star'

function JobCard ({ job }) {
  // Get useful variables
  const IdWorker = job.id_worker

  const [editMode, setEditMode] = useState(false)
  const [loading, setLoading] = useState(false)

  const toggleEditMode = () => {
    setEditMode(!editMode)
  }

  const handleSubmit = async (userdata) => {
    userdata.preventDefault()

    setLoading(true)

    const sendData = {
      IdWorker,
      hourly_price: userdata.target.hourlyPrice.value,
      employees: userdata.target.employees.value,
      attention_hours: userdata.target.attentionHours.value,
      description: userdata.target.description.value
    }
    const response = await fetch('/api/update/worker', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sendData)
    })
    const data = await response.json()

    if (data.error) {
      alert(data.error)
    } else {
      // If there is not any problem the page is refreshed
      window.location.reload()
    }
    setLoading(false)
  }

  return (
    <div>
      <picture className='relative'>
        <button onClick={toggleEditMode} className='text-brand8 absolute right-0 bg-brand3 p-2 rounded-full hover:bg-brand5'>
          <PenIcon />
        </button>
      </picture>

      <div>
        {editMode
          ? (
            <form onSubmit={handleSubmit} className='grid grid-cols-2 gap-x-4 gap-y-2'>
              <label htmlFor='hourlyPrice'>Precio por hora</label>
              <input type='number' min='0' max='200000000' step='1' name='hourlyPrice' id='hourlyPrice' defaultValue={job.hourly_price} className='text-black p-1 rounded-md' />
              <label htmlFor='employees'>Cantidad de empleados</label>
              <input type='number' min='1' max='1000' step='1' name='employees' id='employees' defaultValue={job.employees} className='text-black p-1 rounded-md' />
              <label htmlFor='attentionHours'>Horas de atención</label>
              <input type='text' name='attentionHours' id='attentionHours' defaultValue={job.attention_hours} className='text-black p-1 rounded-md' />
              <label htmlFor='description'>Descripción</label>
              <input type='text' name='description' id='description' defaultValue={job.description} className='text-black p-1 rounded-md' />
              <button disabled={loading} className='rounded-xl border-2 border-brand6 bg-brand6 px-4 py-2 font-semibold text-brand8 hover:text-brand1 disabled:opacity-50' type='submit'>
                Actualizar
              </button>
            </form>
            )
          : (
            <li key={job.id_worker} className='p-4 border-2 mb-2 mx-2 rounded-md border-brand4/40'>
              <span className='opacity-60 text-sm'>Nombre del oficio</span>
              <div>{job.category}</div>
              <span className='opacity-60 text-sm'>Precio por hora</span>
              <div>${job.hourly_price}</div>
              <span className='opacity-60 text-sm'>Cantidad de empleados</span>
              <div>{job.employees}</div>
              <span className='opacity-60 text-sm'>Horas de atención</span>
              <div>{job.attention_hours}</div>
              <span className='opacity-60 text-sm'>Descripción</span>
              <div>{job.description}</div>
              <span className='opacity-60 text-sm'>Puntaje</span>
              <div className='flex flex-row gap-1 content-center text-xl'>
                {job.score}/5
                <StarIcon className='size-5 text-brand5' />
              </div>
              <div className='flex justify-start jobs-center'>
                <Link className='rounded-xl bg-brand4 text-brand8 px-4 py-2 mt-2' href={{ pathname: '/perfil/vercriticas', query: { category: job.category } }}>
                  Reseñas
                </Link>
              </div>
            </li>
            )}
      </div>
    </div>
  )
}

export default JobCard
