/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useEffect, useState } from 'react'
import Worker from './Worker'

function Filters ({ category }) {
  const [workers, setWorkers] = useState([])
  const [filter, setFilter] = useState({})
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)

  const changeFilter = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)

    const newFilter = {
      name: formData.get('name'),
      hourly_price: formData.get('hourly_price'),
      employees: formData.get('employees'),
      score: formData.get('score')
    }

    // if the filters dont change
    if (Object.values(newFilter).every((value) => value === filter[name])) {
      return
    }

    if (Object.values(newFilter).every((value) => value === '')) {
      setFilter({})
    } else {
      setFilter(newFilter)
    }
  }

  useEffect(() => {
    setLoading(true)
    fetch('/api/workers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ category, filter })
    })
      .then((res) => res.json())
      .then((data) => {
        setWorkers(data.workers)
      })
      .finally(() => setLoading(false))
  }, [filter])

  return (
    <>
      {
        open
          ? (
            <button>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6'
                onClick={() => setOpen(false)}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
            )
          : (
            <button
              onClick={() => setOpen(true)}
              className='flex items-center gap-2'
            >
              <p>Filtrar</p>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
                />
              </svg>
            </button>
            )
        }

      {open && (
        <form onSubmit={changeFilter} className='flex max-w-3xl flex-col gap-4 mb-4'>
          <div>
            <span>Nombre y apellido</span>
            <input
              type='text'
              name='name'
              placeholder='Juan Perez'
            />
          </div>
          <div>
            <span>precio por hora</span>
            <input
              type='number'
              min='0'
              name='hourly_price'
              placeholder='500'
            />
          </div>
          <div>
            <span>N° de empleados</span>
            <input
              type='number'
              min='0'
              name='employees'
              placeholder='5'
            />
          </div>
          <div>
            <span>Puntaje</span>
            <input
              type='number'
              min='0'
              max='5'
              name='score'
              placeholder='5'
            />
          </div>
          <div>
            <button type='reset' className='bg-brand6/10 p-2 hover:bg-brand6/40 rounded-md'>
              Limpiar filtros
            </button>
          </div>
          <button type='submit' className='bg-brand6/10 p-2 hover:bg-brand6/40 rounded-md'>
            Filtrar
          </button>
        </form>
      )}

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        {
          loading
            ? <div>Cargando...</div>
            : workers.length === 0
              ? <div>No hay {category} disponible</div>
              : workers.map((item) => (
                <Worker worker={item} key={item.id_worker} />
              ))
        }
      </div>
    </>
  )
}

export default Filters
