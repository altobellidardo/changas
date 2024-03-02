/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import Categorias from './categories'

function JobsType ({ info }) {
  const { name, categoria, description, image } = info
  return (
    <div className='flex items-center p-6 gap-4 text-brand1 bg-brand7 rounded-xl'>
      <img src={image} alt={name} className='size-36 object-cover rounded-xl' />
      <div>
        <h3 className='text-2xl font-semibold'>{name}</h3>
        <span className='font-semibold'>{categoria}</span>
        <p>{description}</p>
      </div>
      <Link href='/' className='font-semibold border-2 border-brand1 rounded-xl px-4 py-2 text-brand1 hover:bg-brand1 hover:text-brand7'>Contratar</Link>
    </div>
  )
}

function TrabajosPage () {
  return (
    <main className='min-h-screen bg-brand1 text-brand8 px-10 pt-10'>
      <Link href='/' className='font-semibold hover:underline underline-offset-4'>Ir al inicio</Link>
      <h1 className='text-4xl font-semibold mt-5 mb-10'>Trabajos disponibles</h1>
      <section className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {Categorias.map((info) => (
          <JobsType key={info.id} info={info} />
        ))}
      </section>
    </main>
  )
}

export default TrabajosPage
