import Header from '@/components/header'
import Footer from '@/components/footer'
import Link from 'next/link'
import Tag from '@/components/ui/tag'
import Image from 'next/image'

async function Home () {
  return (
    <main className='min-h-screen bg-brand8'>
      <Header />

      <div className='w-full relative'>
        <Image priority src='/img/home/home.webp' alt='business photo' width='640' height='411' className='object-cover h-[650px] w-full' />
        <div className='absolute top-0 left-0 w-full h-full bg-black/60' />
        <section className='absolute bottom-16 left-40 text-left text-brand8'>
          <p className='max-w-[50vw] text-5xl font-bold text-balance'>
            Encuentra profesionales calificados para tus proyectos o haz crecer tu negocio.
          </p>
          <div className='mt-10 flex items-center gap-4'>
            <Link href='/auth/sign-up' className='rounded-xl border-2 border-brand6 bg-brand6 px-4 py-2 font-semibold text-black hover:text-brand8'>Unirse ahora</Link>
            <Link href='/trabajos' className='rounded-xl border-2 border-brand6 bg-brand6/20 px-4 py-2 font-semibold text-brand8 hover:bg-brand6'>Explorar Trabajos</Link>
          </div>
        </section>
      </div>

      <section className='my-20 mx-auto px-4 w-[80vw] max-w-[800px] text-balance'>
        <h2 className='text-5xl font-bold'>Contrata a los Mejores.</h2>
        <h2 className='mb-4 text-5xl font-bold'>Haz el trabajo.</h2>
        <p className='text-xl'>Conectando profesionales cualificados con clientes. Encuentra a la persona adecuada para tu proyecto o sé contratado por tu experiencia.</p>
      </section>

      <section className='mx-auto mt-32 mb-40 bg-brand6 w-3/4 rounded-[40px] flex flex-col lg:flex-row'>
        <h3 className='text-5xl font-bold text-brand8 flex w-full items-center px-20 pt-10 lg:py-0'>Descubre tu plataforma de confianza</h3>
        <Image src='/img/home/home2.webp' alt='business photo' width='1440' height='810' className='w-full lg:w-1/2 relative top-16 lg:right-16 rounded-[40px] border-[6px] border-brand1' />
      </section>

      <section className='flex flex-col lg:flex-row gap-4 max-w-[80%] mx-auto font-semibold'>
        <div className='text-brand2 p-6 w-full'>
          <h3 className='text-2xl text-pretty mb-6'>Nuestras modalidades de usuarios</h3>
          <div>
            <p>Elige modalidad que mejor se ajuste a tus necesidades.</p>
            <p>La modalidad seleccionada aplicará para todos los empleos de la plataforma, salvo que alguno no se encuentre en esa modalidad. </p>
          </div>
        </div>

        <div className='bg-brand2 p-6 rounded-2xl text-brand8 w-full'>
          <h3 className='text-2xl text-pretty mb-6'>Para clientes</h3>
          <ul className='list-disc ml-6'>
            <li>
              Encuentra una amplia variedad de profesionales cualificados para tus proyectos de mejora del hogar, desde electricistas, fontaneros, pintores y más.
            </li>
            <li>
              Conecta fácilmente con expertos en el área que necesitas y revisa reseñas auténticas para contratar con total confianza.
            </li>
            <li>
              Lee reseñas y contrata con confianza.
            </li>
          </ul>
        </div>

        <div className='bg-brand2 p-6 rounded-2xl text-brand8 w-full'>
          <h3 className='text-2xl text-pretty mb-6'>Para trabajadores</h3>
          <ul className='list-disc ml-6'>
            <li>
              Destaca tu experiencia y habilidades para ser contratado por clientes potenciales que buscan tus servicios.
            </li>
            <li>
              Muestra tu portfolio y testimonios para demostrar tu valía y destacarte entre la competencia.
            </li>
            <li>
              Amplía tu base de clientes y haz crecer tu negocio, aprovechando la exposición y la confianza que nuestra plataforma ofrece.
            </li>
          </ul>
        </div>
      </section>

      <section className='mx-auto px-4 my-32 w-[80vw] max-w-[1000px]'>
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
