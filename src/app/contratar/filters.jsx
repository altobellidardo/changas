'use client'

import JobBanner from '@/components/JobBanner'
import { useState } from 'react'

function FiltersContratar ({ categories }) {
  const [filteredCategories, setFilteredCategories] = useState(categories)

  const filter = (event) => {
    const value = event.target.value
    const filtered = categories.filter((item) => item.name.toLowerCase().includes(value.toLowerCase()))
    setFilteredCategories(filtered)
  }

  return (
    <section>
      <div>
        <span className='mr-4'>Filtrar</span>
        <input type='text' onChange={filter} placeholder='Jardinero' className='rounded-xl bg-brand6/10 focus:bg-brand6/40 focus:placeholder:text-black/60 p-2 mb-4' />
      </div>

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-[1200px]'>
        {filteredCategories.map((item) => (
          <JobBanner key={item.name} info={item} link={`/contratar/${item.name}`} />
        ))}
      </div>
    </section>
  )
}

export default FiltersContratar
