import Image from 'next/image'
import { LADO } from '@/app/nosotros/cardsData'

function Card ({ info }) {
  let imageStyles = 'absolute top-[30px] w-[560px]'
  let infoStyles = 'absolute bg-brand5 w-[400px] h-[370px] rounded-[45px] p-10 text-brand8'

  if (info.lado === LADO.DER) {
    imageStyles += ' left-0'
    infoStyles += ' left-[500px]'
  } else {
    imageStyles += ' right-0'
    infoStyles += ' right-[500px]'
  }

  return (
    <section className='h-[450px] w-[900px] mx-auto'>
      <article key={info.titulo} className='relative'>
        <Image className={imageStyles} src={info.imagen} alt={info.titulo} width={info.width} height={info.height} />
        <header className={infoStyles}>
          <h1 className='text-3xl leading-[30px] font-semibold mb-4 text-pretty'>{info.titulo}</h1>
          <p className='text-xl'>{info.subtitulo}</p>
        </header>
      </article>
    </section>
  )
}

export default Card
