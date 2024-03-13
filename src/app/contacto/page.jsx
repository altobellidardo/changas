import Footer from '@/components/footer'
import Header from '@/components/Header'
import Image from 'next/image'
import Link from 'next/link'

function ContactPage () {
  return (
    <article className='min-h-screen bg-brand8'>
      <Header />
      <picture className='overflow-hidden'>
        <Image src='/contacto.webp' alt='business photo' width='1920' height='800' className='w-full h-96 object-cover blur-[2.5px]' />
      </picture>
      <main className='my-20'>
        <h1 className='text-5xl font-semibold text-brand1 text-center'>¿Tenés alguna consulta?</h1>
        <h2 className='text-xl text-center font-semibold text-brand5'>Nuestro equipo está aqui para ayudarte</h2>
        <div className='flex gap-4 justify-center mt-20 flex-col md:flex-row w-fit mx-auto'>
          <Link className='bg-brand6 p-4 rounded-xl text-brand8 flex items-center gap-5 font-semibold text-2xl' href='mailto:mrulli@etrr.edu.ar'>
            <svg xmlns='http://www.w3.org/2000/svg' className='size-16' width='24' height='24' viewBox='0 0 24 24' fill='currentColor'><path stroke='none' d='M0 0h24v24H0z' fill='none' /><path d='M22 7.535v9.465a3 3 0 0 1 -2.824 2.995l-.176 .005h-14a3 3 0 0 1 -2.995 -2.824l-.005 -.176v-9.465l9.445 6.297l.116 .066a1 1 0 0 0 .878 0l.116 -.066l9.445 -6.297z' /><path d='M19 4c1.08 0 2.027 .57 2.555 1.427l-9.555 6.37l-9.555 -6.37a2.999 2.999 0 0 1 2.354 -1.42l.201 -.007h14z' /></svg>
            Enviar mail
          </Link>
          <Link className='bg-brand6 p-4 rounded-xl text-brand8 flex items-center gap-5 font-semibold text-2xl' href='/'>
            <svg xmlns='http://www.w3.org/2000/svg' className='size-16' width='24' height='24' viewBox='0 0 24 24' fill='currentColor'><path stroke='none' d='M0 0h24v24H0z' fill='none' /><path d='M10.425 1.414a3.33 3.33 0 0 1 3.026 -.097l.19 .097l6.775 3.995l.096 .063l.092 .077l.107 .075a3.224 3.224 0 0 1 1.266 2.188l.018 .202l.005 .204v7.284c0 1.106 -.57 2.129 -1.454 2.693l-.17 .1l-6.803 4.302c-.918 .504 -2.019 .535 -3.004 .068l-.196 -.1l-6.695 -4.237a3.225 3.225 0 0 1 -1.671 -2.619l-.007 -.207v-7.285c0 -1.106 .57 -2.128 1.476 -2.705l6.95 -4.098zm1.575 13.586a1 1 0 0 0 -.993 .883l-.007 .117l.007 .127a1 1 0 0 0 1.986 0l.007 -.117l-.007 -.127a1 1 0 0 0 -.993 -.883zm1.368 -6.673a2.98 2.98 0 0 0 -3.631 .728a1 1 0 0 0 1.44 1.383l.171 -.18a.98 .98 0 0 1 1.11 -.15a1 1 0 0 1 -.34 1.886l-.232 .012a1 1 0 0 0 .111 1.994a3 3 0 0 0 1.371 -5.673z' /></svg>
            Buscar info
          </Link>
        </div>
      </main>
      <Footer />
    </article>
  )
}

export default ContactPage
