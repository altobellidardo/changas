/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import Categorias from './categories'

function JobsType ({ info }) {
  const { name, categoria, description, image } = info
  return (
    <div className='flex items-center gap-4 rounded-xl bg-brand7 p-6 text-brand1'>
      <img src={image} alt={name} className='size-36 rounded-xl object-cover' />
      <div>
        <h3 className='text-2xl font-semibold'>{name}</h3>
        <span className='font-semibold'>{categoria}</span>
        <p>{description}</p>
      </div>
      <Link href='/' className='rounded-xl border-2 border-brand1 px-4 py-2 font-semibold text-brand1 hover:bg-brand1 hover:text-brand7'>Contratar</Link>
    </div>
  )
}

function TrabajosPage () {
  return (
    <main className='min-h-screen bg-brand1 px-10 pt-10 text-brand8'>
      <Link href='/' className='font-semibold underline-offset-4 hover:underline'>Ir al inicio</Link>
      <h1 className='mb-10 mt-5 text-4xl font-semibold'>Trabajos disponibles</h1>
      <section className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        {Categorias.map((info) => (
          <JobsType key={info.id} info={info} />
        ))}
      </section>
    </main>
  )
}

export default TrabajosPage
