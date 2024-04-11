import { getWorkers } from '@/actions/getWorkers'
import Footer from '@/components/footer'
import Header from '@/components/header/header'

function Worker ({ worker }) {
  return (
    <div className='p-4 border-2 border-brand5/50 rounded-md m-2 w-96'>
      <div>Nombre del trabajador: {worker.username}</div>
      <div>Nombre del oficio: {worker.category}</div>
      <div>Precio por hora: {worker.hourly_price}</div>
      <div>N° de empleados: {worker.employees}</div>
      <div>Horas de búsqueda: {worker.attention_hours}</div>
      <div>Descripción: {worker.description}</div>
      <div>Puntaje: {worker.score}</div>
    </div>
  )
}

export default async function JobWorkers ({ params }) {
  const { category } = params
  const workers = await getWorkers(category)

  return (
    <main className='min-h-screen flex flex-col justify-between'>
      <Header />
      <section className='pt-10 max-w-[80vw] mx-auto my-10'>
        <h1 className='text-3xl font-bold'>Contratar </h1>

        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          {
            workers.map((item) => (
              <Worker worker={item} key={item.id_worker} />
            ))
          }
        </div>
      </section>
      <Footer />
    </main>
  )
}
