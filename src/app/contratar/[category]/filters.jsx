/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useEffect, useState } from 'react'
import Worker from './Worker'
import { RESULTS_PER_PAGE } from '@/constants'

function Filters ({ category, IdUser }) {
  const [workers, setWorkers] = useState([])
  const [filter, setFilter] = useState({})
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [page, setPage] = useState(0)

  const changeFilter = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)

    // The filter cannot have blank spaces due to the query requirements
    const newFilter = {
      name: formData.get('name') !== '' ? formData.get('name') : undefined,
      country: formData.get('country') !== '' ? formData.get('country') : undefined,
      province: formData.get('province') !== '' ? formData.get('province') : undefined,
      city: formData.get('city') !== '' ? formData.get('city') : undefined,
      hourly_price: formData.get('hourly_price') !== '' ? formData.get('hourly_price') : undefined,
      employees: formData.get('employees') !== '' ? formData.get('employees') : undefined,
      score: formData.get('score') !== '' ? formData.get('score') : undefined,
      distance: formData.get('distance') !== '' ? formData.get('distance') : undefined
    }

    // if the filters don't change
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

    const query = `category=${category}&name=${filter.name}&country=${filter.country}&province=${filter.province}&city=${filter.city}&hourly_price=${filter.hourly_price}&score=${filter.score}&employees=${filter.employees}&distance=${filter.distance}&page=${page}`

    const fetchData = async () => {
      const response = await fetch(`/api/filters/get-workers?${query}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        cache: 'no-store'
      })
      const { workers } = await response.json() // call .json() on the response
      setWorkers(workers)
    }
    fetchData().finally(() => setLoading(false))
  }, [filter, page])

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
              className='flex items-center gap-2 mb-6'
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
            <span>Nombre y apellido </span>
            <input
              type='text'
              name='name'
              placeholder='Juan Perez'
            />
          </div>
          <div>
            <span>Precio por hora menor a </span>
            <input
              type='number'
              min='0'
              name='hourly_price'
              placeholder='500'
            />
          </div>
          <div>
            <span>País </span>
            <input
              type='text'
              name='country'
              placeholder='Argentina'
            />
          </div>
          <div>
            <span>Provincia </span>
            <input
              type='text'
              name='province'
              placeholder='Buenos Aires'
            />
          </div>
          <div>
            <span>Ciudad </span>
            <input
              type='text'
              name='city'
              placeholder='La Plata'
            />
          </div>
          <div>
            <span>Distancia menor a (km) </span>
            <input
              type='number'
              min='0'
              name='distance'
              placeholder='40'
            />
          </div>
          <div>
            <span>N° de empleados mayor a </span>
            <input
              type='number'
              min='0'
              name='employees'
              placeholder='5'
            />
          </div>
          <div>
            <span>Puntaje </span>
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

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 max-w-[1200px]'>
        {
          loading
            ? <div>Cargando...</div>
            : workers.length === 0
              ? <div>No hay {category} disponible</div>
              : workers.map((item) => (
                <Worker worker={item} IdUser={IdUser} key={item.id_worker} />
              ))
        }
      </div>
      <section className='flex justify-center pb-4'>
        {Number(page) > 0 ? <button onClick={() => setPage(Number(page) - 1)} className='mx-2 text-4xl'>&lt;</button> : undefined}
        {workers.length === RESULTS_PER_PAGE ? <button onClick={() => setPage(Number(page) + 1)} className='mx-2 text-4xl'>&gt;</button> : undefined}
      </section>
    </>
  )
}

export default Filters
