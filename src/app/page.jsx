import Header from '@/components/header'
import Link from 'next/link'

function Home () {
  return (
    <main className='min-h-screen bg-brand8'>
      <Header />

      <section className='w-full max-w-[1000px] mx-auto my-28'>
        <h2 className='text-5xl font-semibold'>Contrata a los Mejores. Haz el Trabajo.</h2>
        <p className='text-2xl'>Conectando profesionales cualificados con clientes. Encuentra a la persona adecuada para tu proyecto o sé contratado por tu experiencia.</p>
        <div className='flex gap-4 my-5 justify-center items-center'>
          <Link href='/trabajos' className='font-semibold border-2 border-brand6 text-brand6 rounded-xl px-4 py-2 hover:text-brand1 hover:bg-brand6'>Explorar Trabajos</Link>
          <Link href='/login' className='font-semibold rounded-xl px-4 py-2 bg-brand6 text-brand8 hover:text-brand1'>Registrarse</Link>
        </div>
      </section>

      <section className='w-full max-w-[1000px] mx-auto my-28 flex gap-4'>
        <div className='w-1/2'>
          <h2 className='text-5xl font-semibold'>Tu Plataforma de Confianza</h2>
          <p className='text-2xl'>Los clientes confían en nuestra plataforma para encontrar profesionales cualificados para sus proyectos. Los profesionales confían en nosotros para conectarse con clientes potenciales y hacer crecer su negocio.</p>
        </div>

        <div className='w-1/2 flex gap-7 flex-col'>
          <div>
            <h3 className='text-xl font-semibold'>Para Clientes</h3>
            <ul>
              <li> - Encuentra profesionales cualificados para tus proyectos de mejora del hogar</li>
              <li> - Conéctate con electricistas, fontaneros, pintores y más</li>
              <li> - Lee reseñas y contrata con confianza</li>
            </ul>
          </div>

          <div>
            <h3 className='text-xl font-semibold'>Para Profecionales</h3>
            <ul>
              <li> - Sé contratado por tu experiencia</li>
              <li> - Muestra tus habilidades y experiencia</li>
              <li> - Haz crecer tu base de clientes</li>
            </ul>
          </div>
        </div>
      </section>

    </main>
  )
}

export default Home
