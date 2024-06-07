'use client'

// import PlusIcon from '@/components/icons/PlusIcon'
import StarIcon from '@/components/icons/Star'
import Link from 'next/link'
import { useState } from 'react'

function Worker ({ worker, IdUser }) {
  const [show, setShow] = useState(false)

  const city = worker.location.split(',')[0]
  const handleShow = () => setShow(!show)

  return (
    <section className='p-4 py-8 border-b-0 rounded-xl border-brand6 bg-brand6/10 mb-2'>
      <div className='grid grid-cols-3'>
        <header>
          <span className='font-bold'>{worker.username}</span>
          <div className='flex gap-2'>
            <span>{city}</span>
            <span>|</span>
            <span className='flex gap-1 items-center'>
              {worker.score}
              <StarIcon className='size-4 text-brand6' />
            </span>
          </div>
          <span className='text-xl font-bold'>${worker.hourly_price}/h</span>
        </header>
        <main className='my-auto'>
          <p>Hay <span className='font-bold'>{worker.employees}</span> empleado/s</p>
          <p>Horas de búsqueda:</p>
          <p className='font-bold'>{worker.attention_hours}</p>
        </main>
        <footer className='flex gap-2'>
          <button className='' onClick={handleShow}>Ver más</button>
          {worker.id_user !== IdUser &&
            <Link href={`/chats/nuevochat?idUser2=${worker.id_user}&Username2=${worker.username}`} className='hover:underline'>Contactar</Link>}
        </footer>
      </div>
      {show &&
        <div className='mt-4'>
          <span className='opacity-60 text-sm'>Descripción</span>
          <div>{worker.description}</div>
        </div>}
    </section>
  )
}

export default Worker
