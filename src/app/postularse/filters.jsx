'use client'

import JobBanner from '@/components/JobBanner'
import { useEffect, useState } from 'react'

function FiltersPostularse ({ initial }) {
  const [categories, setCategories] = useState(initial)
  const [filter, setFilter] = useState({})

  const fetchCategoriesFiltered = async (filter) => {
    const response = await fetch('/api/filters/get-workers', { // change endpoint
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(filter)
    })
    const { categories } = await response.json()
    setCategories(categories)
  }

  useEffect(() => {
    fetchCategoriesFiltered(filter)
  }, [filter])

  return (
    <section className='pt-10 max-w-[80vw] mx-auto my-10'>
      <h1 className='text-3xl font-bold'>Ofertas laborales </h1>
      <p className='mb-4'>
        Hay {categories.length} {categories.length === 1 ? 'oficio' : 'oficios'} disponibles
      </p>

      <div>
        <span className='mr-4'>Filtrar</span>
        <input
          type='text'
          onChange={(e) => setFilter({ name: e.target.value })}
          placeholder='Jardinero'
          className='rounded-xl bg-brand6/10 p-2 mb-4'
        />
      </div>

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 max-w-[1200px]'>
        {
          categories.map((item) => (
            <JobBanner key={item.name} info={item} link={`/postularse/${item.name}?page=0`} />
          ))
        }
      </div>
    </section>
  )
}

export default FiltersPostularse
