import Image from 'next/image'
import { LADO } from '@/utils/cardsData'

function Card ({ info, index }) {
  const imageStyles = `absolute top-[30px] left-${info.lado === LADO.IZQ ? '0' : '[500px]'} w-[560px]`
  const infoStyles = `absolute bg-brand5 w-[600px] h-[370px] rounded-[45px] p-10 text-brand8 ${info.lado === LADO.IZQ ? 'left-[470px]' : ''}`
  return (
    <article key={info.titulo} className='relative' style={{ marginTop: index * 500 }}>
      <Image className={imageStyles} src={info.imagen} alt={info.titulo} width={info.width} height={info.height} />
      <header className={infoStyles}>
        <h1 className='text-5xl leading-[60px] font-semibold mb-4 text-pretty'>{info.titulo}</h1>
        <p className='text-2xl'>{info.subtitulo}</p>
      </header>
    </article>
  )
}

export default Card
