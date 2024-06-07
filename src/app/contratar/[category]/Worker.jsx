'use client'

// import PlusIcon from '@/components/icons/PlusIcon'
import StarIcon from '@/components/icons/Star'
import Link from 'next/link'
import { useState } from 'react'

function Worker ({ worker, IdUser }) {
  const [show, setShow] = useState(false)

  const statesA = {
    'Cdad. Autónoma de Buenos Aires': 'Cda. Bs. As.',
    'Provincia de Buenos Aires': 'Bs. As.'
  }

  const stateIndex = worker.location.split(',')[1].trim()
  const state = statesA[stateIndex]
  const city = worker.location.split(',')[0] + ', ' + state

  const handleShow = () => setShow(!show)

  return (
    <section className='p-4 py-8 border-b-0 rounded-xl border-brand6 bg-brand6/10 mb-2'>
      <div className='flex flex-col md:grid grid-cols-3'>
        <header>
          <span className='font-bold'>{worker.username}</span>
          <div className='flex gap-2'>
            <span>{city}</span>
            <div className='w-1 h-1 rounded-full bg-black my-auto' />
            <span className='flex gap-1 items-center'>
              {worker.score}
              <StarIcon className='size-4 text-brand6' />
            </span>
          </div>
          <span className='text-xl font-bold'>${worker.hourly_price}/h</span>
        </header>
        <main className='my-auto'>
          <p><span className='font-bold'>{worker.employees}</span> empleado/s</p>
          <p>Horas de búsqueda:</p>
          <p className='font-bold'>{worker.attention_hours}</p>
        </main>
        <footer className='flex gap-2 justify-center mt-2 md:mt-0 md:justify-end'>
          <button className='hover:underline bg-brand6/20 px-2 py-1 rounded h-fit my-auto' onClick={handleShow}>
            {show ? 'Ocultar' : 'Mostrar'}
          </button>
          {worker.id_user !== IdUser &&
            <Link
              href={`/chats/nuevochat?idUser2=${worker.id_user}&Username2=${worker.username}`}
              className='hover:underline bg-brand6/20 px-2 py-1 rounded h-fit my-auto'
            >
              Contactar
            </Link>}
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
