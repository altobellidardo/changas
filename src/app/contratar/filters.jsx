'use client'

import Link from 'next/link'
import { useState } from 'react'

function Category ({ category }) {
  return (
    <div className='p-4 border-2 rounded-xl border-brand6 bg-brand6/10'>
      <Link className='text-xl font-bold hover:underline' href={`/contratar/${category.name}`}>
        {category.name}
      </Link>
      <p>{category.description}</p>
    </div>
  )
}

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
        <input type='text' onChange={filter} placeholder='Jardinero' className='rounded-xl bg-brand6/10 p-2 mb-4' />
      </div>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        {
          filteredCategories.map((item) => (
            <Category key={item.name} category={item} />
          ))
        }
      </div>
    </section>
  )
}

export default FiltersContratar
