import Card from '@/components/Card'
import Footer from '@/components/footer'
import Header from '@/components/header2'
import Image from 'next/image'
import { cards } from '@/utils/cardsData'

function NosotrosPage () {
  return (
    <main className='min-h-screen bg-brand1 text-brand8'>
      <Header />
      <div className='w-full relative'>
        <Image src='/nosotros.webp' alt='business photo' width='1920' height='1280' className='object-cover h-96' />
        <div className='absolute top-0 left-0 w-full h-full bg-black/60' />
        <section className='absolute bottom-16 left-10 text-left'>
          <h1 className='text-5xl font-semibold mb-2'>Nosotros</h1>
          <p className='max-w-[50vw]'>Changas busca simplificar el acceso al empleo para quienes enfrentan dificultades laborales, conectando empleadores con trabajadores potenciales. </p>
        </section>
      </div>

      <section className='bg-brand8 text-black h-[1600px] p-20'>
        {cards.map((info, index) => (
          <Card key={info.titulo} info={info} index={index} />
        ))}
      </section>
      <Footer />
    </main>
  )
}

export default NosotrosPage
