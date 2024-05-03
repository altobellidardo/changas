import Image from 'next/image'

function Card ({ info }) {
  return (
    <section className='flex-col'>
      <Image className='rounded-t-[45px] w-full h-[400px] object-cover' src={info.imagen} alt={info.titulo} width={info.width} height={info.height} />
      <article className='p-4 py-6 md:p-10 lg:h-[360px] bg-brand6 rounded-b-[45px]'>
        <h1 className='text-3xl font-semibold text-pretty'>{info.titulo}</h1>
        <p className='text-md '>{info.subtitulo}</p>
      </article>
    </section>
  )
}

export default Card
