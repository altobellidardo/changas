import Card from '@/components/Card'
import Footer from '@/components/footer'
import Header from '@/components/header/header'
import Image from 'next/image'
import { cards } from '@/app/nosotros/cardsData'

function NosotrosPage () {
  return (
    <main className='min-h-screen bg-brand1 text-brand8'>
      <Header />
      <div className='w-full relative'>
        <Image src='/img/nosotros/nosotros.webp' alt='business photo' width='1920' height='384' className='object-cover h-96 w-full' priority />
        <div className='absolute top-0 left-0 w-full h-full bg-black/60' />
        <section className='absolute bottom-4 md:bottom-16 left-10 text-left'>
          <h1 className='text-5xl font-semibold mb-2'>Nosotros</h1>
          <p className='max-w-[50vw]'>Changas Red busca simplificar el acceso al empleo para quienes enfrentan dificultades laborales, conectando empleadores con trabajadores potenciales. </p>
        </section>
      </div>

      <section className='bg-brand8 text-black p-6 md:py-20 flex flex-col lg:grid grid-cols-3 gap-10'>
        {cards.map(info => (
          <Card key={info.titulo} info={info} />
        ))}
      </section>
      <Footer />
    </main>
  )
}

export default NosotrosPage
