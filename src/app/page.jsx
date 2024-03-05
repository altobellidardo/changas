import Header from '@/components/header'
import Footer from '@/components/footer'
import Link from 'next/link'
import Divider from '@/app/ui/divider'
import Tag from '@/app/ui/tag'

async function Home () {
  return (
    <main className='min-h-screen bg-brand8'>
      <Header />

      <section className='mx-auto my-32 w-full max-w-[1000px]'>
        <h2 className='mb-2 text-5xl font-semibold'>Contrata a los Mejores. Haz el Trabajo.</h2>
        <p className='text-2xl'>Conectando profesionales cualificados con clientes. Encuentra a la persona adecuada para tu proyecto o sé contratado por tu experiencia.</p>
        <div className='my-5 mt-12 flex items-center justify-center gap-4'>
          <Link href='/trabajos' className='rounded-xl border-2 border-brand6 px-4 py-2 font-semibold text-brand6 hover:bg-brand6 hover:text-brand1'>Explorar Trabajos</Link>
          <Link href='/sign-up' className='rounded-xl border-2 border-brand6 bg-brand6 px-4 py-2 font-semibold text-brand8 hover:text-brand1'>Unirse ahora</Link>
        </div>
      </section>

      <Divider />

      <section className='mx-auto my-32 flex w-full max-w-[1000px] gap-4'>
        <div className='w-1/2'>
          <h2 className='mb-2 text-5xl font-semibold'>Tu Plataforma de Confianza</h2>
          <p className='text-balance text-2xl'>Los clientes confían en nuestra plataforma para encontrar profesionales cualificados para sus proyectos. Los profesionales confían en nosotros para conectarse con clientes potenciales y hacer crecer su negocio.</p>
        </div>

        <div className='flex w-1/2 flex-col gap-7'>
          <div>
            <h3 className='mb-2 text-xl font-semibold'>Para Clientes</h3>
            <ul>
              <li> - Encuentra profesionales cualificados para tus proyectos de mejora del hogar</li>
              <li> - Conéctate con electricistas, fontaneros, pintores y más</li>
              <li> - Lee reseñas y contrata con confianza</li>
            </ul>
          </div>

          <div>
            <h3 className='mb-2 text-xl font-semibold'>Para Profecionales</h3>
            <ul>
              <li> - Sé contratado por tu experiencia</li>
              <li> - Muestra tus habilidades y experiencia</li>
              <li> - Haz crecer tu base de clientes</li>
            </ul>
          </div>
        </div>
      </section>

      <Divider />

      <section className='mx-auto my-32 w-full max-w-[1000px]'>
        <h1 className='mb-2 text-5xl font-semibold'>Únete a la Plataforma</h1>
        <p className='text-balance text-2xl'>Los clientes confían en nuestra plataforma para encontrar profesionales cualificados para sus proyectos. Los profesionales confían en nosotros para conectarse con clientes potenciales y hacer crecer su negocio.</p>

        <div className='mx-auto mb-5 mt-12 flex w-3/4 flex-wrap items-center justify-center gap-4'>
          <Tag nombre='Electricista' />
          <Tag nombre='Plomero' />
          <Tag nombre='Pintor' />
          <Tag nombre='Servicio doméstico' />
          <Tag nombre='Carpintero' />
          <Tag nombre='Cerrajero' />
          <Tag nombre='Cocinero' />
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default Home
