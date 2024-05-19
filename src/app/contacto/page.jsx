/* eslint-disable @next/next/no-img-element */
import Footer from '@/components/footer'
import Header from '@/components/header'
import Image from 'next/image'
import Link from 'next/link'

function ContactPage () {
  return (
    <article className='min-h-screen bg-brand8'>
      <Header />
      <div className='w-full relative text-brand8'>
        <Image src='/img/contacto/contacto.webp' alt='business photo' width='1920' height='1280' className='object-cover h-96 w-full' priority />
        <div className='absolute top-0 left-0 w-full h-full bg-black/60' />
        <section className='absolute bottom-16 left-10 text-left'>
          <h1 className='text-5xl font-semibold mb-2'>¿Tenés alguna consulta?</h1>
          <p className='text-xl max-w-[50vw]'>Nuestro equipo está aqui para ayudarte</p>
        </section>
      </div>

      <main className='my-20'>
        <div className='flex gap-10 justify-center mt-20 flex-col md:flex-row w-fit mx-auto'>
          <Link className='bg-brand6 p-4 rounded-xl text-brand8 flex items-center gap-5 font-semibold text-2xl' href='mailto:team@changas.site'>
            <svg xmlns='http://www.w3.org/2000/svg' className='size-16' width='128' height='128' viewBox='0 0 24 24'><path fill='currentColor' d='M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zm8-7l8-5V6l-8 5l-8-5v2z' /></svg>
            Enviar mail
          </Link>
          <Link className='bg-brand6 p-4 rounded-xl text-brand8 flex items-center gap-5 font-semibold text-2xl' href='/'>
            <svg xmlns='http://www.w3.org/2000/svg' className='size-16' width='512' height='512' viewBox='0 0 512 512'><path fill='currentColor' d='M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z' /></svg>
            Buscar info
          </Link>
        </div>
      </main>
      <Footer />
    </article>
  )
}

export default ContactPage
