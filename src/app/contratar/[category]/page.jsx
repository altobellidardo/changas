import { getWorkers } from '@/actions/getWorkers'
import Footer from '@/components/footer'
import Header from '@/components/header/header'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

function Worker ({ worker }) {
  return (
    <div className='p-4 border-2 rounded-xl border-brand6 bg-brand6/10 w-96'>
      <span className='opacity-60 text-sm'>Nombre y apellido</span>
      <div>{worker.username}</div>
      <span className='opacity-60 text-sm'>Precio por hora</span>
      <div>${worker.hourly_price}/h</div>
      <span className='opacity-60 text-sm'>N° de empleados</span>
      <div>{worker.employees}</div>
      <span className='opacity-60 text-sm'>Horas de búsqueda</span>
      <div>{worker.attention_hours}</div>
      <span className='opacity-60 text-sm'>Descripción</span>
      <div>{worker.description}</div>
      <span className='opacity-60 text-sm'>Puntaje</span>
      <div>{worker.score}/5</div>
    </div>
  )
}

export default async function JobWorkers ({ params }) {
  let { category } = params
  const workers = await getWorkers(category)

  // clean %20 in string
  category = category.replace(/%20/g, ' ')

  return (
    <main className='min-h-screen flex flex-col justify-between'>
      <Header />
      <section className='pt-10 max-w-[80vw] mx-auto my-10'>
        <Link href='/contratar' className='text-brand6 hover:underline mb-2'>Atrás</Link>
        <h1 className='text-3xl font-bold mb-4'>Contratar {category}</h1>

        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          {
            workers.length === 0
              ? (
                <div>No hay {category} disponible</div>
                )
              : workers.map((item) => (
                <Worker worker={item} key={item.id_worker} />
              ))
          }
        </div>
      </section>
      <Footer />
    </main>
  )
}
