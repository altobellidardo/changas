/* eslint-disable @next/next/no-img-element */
import Footer from '@/components/footer'
import Header from '@/components/header/header'
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
          {/* mail */}
          <Link className='bg-brand6 p-4 rounded-xl text-brand8 flex items-center gap-5 font-semibold text-2xl' href='mailto:team@changas.site'>
            <svg xmlns='http://www.w3.org/2000/svg' className='size-16' width='128' height='128' viewBox='0 0 24 24'><path fill='currentColor' d='M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zm8-7l8-5V6l-8 5l-8-5v2z' /></svg>
          </Link>
          {/* instagram */}
          <Link className='bg-brand6 p-4 rounded-xl text-brand8 flex items-center gap-5 font-semibold text-2xl' href='https://www.instagram.com/changasoficial/' target='_blank' rel='noopener noreferrer'>
            <svg xmlns='http://www.w3.org/2000/svg' className='size-16' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='icon icon-tabler icons-tabler-outline icon-tabler-brand-instagram'><path stroke='none' d='M0 0h24v24H0z' fill='none' /><path d='M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z' /><path d='M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0' /><path d='M16.5 7.5l0 .01' /></svg>
          </Link>
          {/* facebook */}
          <Link className='bg-brand6 p-4 rounded-xl text-brand8 flex items-center gap-5 font-semibold text-2xl' href='/' target='_blank' rel='noopener noreferrer'>
            <svg xmlns='http://www.w3.org/2000/svg' className='size-16' width='24' height='24' viewBox='0 0 24 24' fill='currentColor' class='icon icon-tabler icons-tabler-filled icon-tabler-brand-facebook'><path stroke='none' d='M0 0h24v24H0z' fill='none' /><path d='M18 2a1 1 0 0 1 .993 .883l.007 .117v4a1 1 0 0 1 -.883 .993l-.117 .007h-3v1h3a1 1 0 0 1 .991 1.131l-.02 .112l-1 4a1 1 0 0 1 -.858 .75l-.113 .007h-2v6a1 1 0 0 1 -.883 .993l-.117 .007h-4a1 1 0 0 1 -.993 -.883l-.007 -.117v-6h-2a1 1 0 0 1 -.993 -.883l-.007 -.117v-4a1 1 0 0 1 .883 -.993l.117 -.007h2v-1a6 6 0 0 1 5.775 -5.996l.225 -.004h3z' /></svg>
          </Link>
          {/* tiktok */}
          <Link className='bg-brand6 p-4 rounded-xl text-brand8 flex items-center gap-5 font-semibold text-2xl' href='/' target='_blank' rel='noopener noreferrer'>
            <svg xmlns='http://www.w3.org/2000/svg' className='size-16' width='24' height='24' viewBox='0 0 24 24' fill='currentColor' class='icon icon-tabler icons-tabler-filled icon-tabler-brand-tiktok'><path stroke='none' d='M0 0h24v24H0z' fill='none' /><path d='M16.083 2h-4.083a1 1 0 0 0 -1 1v11.5a1.5 1.5 0 1 1 -2.519 -1.1l.12 -.1a1 1 0 0 0 .399 -.8v-4.326a1 1 0 0 0 -1.23 -.974a7.5 7.5 0 0 0 1.73 14.8l.243 -.005a7.5 7.5 0 0 0 7.257 -7.495v-2.7l.311 .153c1.122 .53 2.333 .868 3.59 .993a1 1 0 0 0 1.099 -.996v-4.033a1 1 0 0 0 -.834 -.986a5.005 5.005 0 0 1 -4.097 -4.096a1 1 0 0 0 -.986 -.835z' /></svg>
          </Link>
          {/* whatsapp */}
          <Link className='bg-brand6 p-4 rounded-xl text-brand8 flex items-center gap-5 font-semibold text-2xl' href='https://wa.me/5492325564231?text=Buen%20d%C3%ADa,%20estoy%20interesado%20en%20sus%20servicios' target='_blank' rel='noopener noreferrer'>
            <svg xmlns='http://www.w3.org/2000/svg' className='size-16' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='icon icon-tabler icons-tabler-outline icon-tabler-brand-whatsapp'><path stroke='none' d='M0 0h24v24H0z' fill='none' /><path d='M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9' /><path d='M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1' /></svg>
          </Link>
        </div>
      </main>
      <Footer />
    </article>
  )
}

export default ContactPage
