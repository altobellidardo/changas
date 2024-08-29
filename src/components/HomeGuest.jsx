import Link from 'next/link'
import Tag from './ui/tag'
import Image from 'next/image'
import supabase from '@/libs/supabase/server'

const { data: categories } = await supabase.from('categories').select()

function Home () {
  return (
    <>
      <section className='w-full relative'>
        <Image
          priority
          src='/img/home/home.webp'
          alt='business photo'
          width='640'
          height='411'
          className='object-cover object-right lg:object-[center,-100px] h-[400px] w-full'
        />
        <div className='absolute top-0 left-0 w-full h-full bg-black/50' />

        <div className='absolute top-0 w-full max-w-[900px] h-full left-[50%] translate-x-[-50%] p-4 text-brand8 text-balance flex flex-col justify-end gap-4'>
          <p className='text-xl md:text-3xl md:w-[80vw] font-bold text-balance max-w-[900px]'>
            Encuentra profesionales calificados para tus proyectos o haz crecer tu negocio
          </p>
          <div className='flex flex-col text-center gap-4 md:flex-row'>
            <Link href='/auth/signup' className='rounded-xl border-2 border-brand6 bg-brand6 px-4 py-2 font-semibold text-black hover:text-brand8'>Unirse ahora</Link>
            <Link href='/trabajos' className='rounded-xl border-2 border-brand6 bg-brand6/20 px-4 py-2 font-semibold text-brand8 hover:bg-brand6'>Explorar Trabajos</Link>
          </div>
        </div>
      </section>

      <section className='mt-20 mx-auto w-[90vw] max-w-[900px] text-balance'>
        <h6 className='text-brand3 font-bold'>¡Nuevo!</h6>
        <h3 className='text-2xl md:text-3xl lg:text-5xl font-bold text-brand3'>Descarga nuestra App</h3>

        <div className='flex flex-row gap-4 pt-8 align-top md:flex-row'>
          <Link href='https://play.google.com/store/apps/details?id=com.changasred.changasred'>
            <Image src='/icons/Google-Play.svg' alt='Descargar en Google Play Store' width='160' height='100' className='mx-auto' />
          </Link>
          <Link href='https://apps.apple.com/us/app/changas-red/id6624295156'>
            <Image src='/icons/App-Store.svg' alt='Descargar en App Store' width='150' height='100' className='mx-auto' />
          </Link>
        </div>
      </section>

      <section className='my-16 lg:mt-32 mx-auto w-[90vw] max-w-[900px] text-balance'>
        <h2 className='text-2xl md:text-3xl lg:text-5xl font-bold'>Contrata a los mejores.</h2>
        <h2 className='mb-4 text-2xl md:text-3xl lg:text-5xl font-bold'>Haz el trabajo</h2>
        <p className='text-md lg:text-xl'>Conectamos profesionales calificados con clientes. Encuentra a la persona adecuada para tu proyecto o sé contratado por tu experiencia.</p>
      </section>

      <section className='bg-brand6 w-[90vw] max-w-[900px] mt-24 lg:mt-32 mx-auto rounded-[20px] relative md:flex flex-row'>
        <h3 className='text-md md:text-5xl w-full md:w-[400px] font-bold text-balance text-center md:text-left p-4 pb-2 md:p-10 text-brand8'>
          Descubre tu plataforma de confianza
        </h3>
        <Image
          src='/img/home/home2.webp'
          alt='business photo'
          width='1440' height='810'
          className='w-[90vw] md:w-[calc(90vw-420px)] lg:w-1/2 md:object-cover lg:object-contain md:py-4 rounded-[20px] lg:rounded-[40px] lg:absolute lg:top-8 lg:right-6'
        />
      </section>

      <section className='flex flex-col lg:flex-row gap-4 mt-32 lg:mt-60 max-w-[900px] mx-auto font-semibold'>
        <div className='text-brand2 p-6 w-full'>
          <h3 className='text-2xl text-pretty mb-6'>Nuestros usuarios</h3>
          <div>
            <p>Aprovechá los beneficios de la plataforma según tus necesidades.</p>
            <p>Aquí no distinguimos entre quién busca servicios o los ofrece, por lo que hay una cuenta única para cada persona.</p>
          </div>
        </div>

        <div className='bg-brand2 p-6 rounded-2xl text-brand8 w-[90%] mx-auto'>
          <h3 className='text-2xl text-pretty mb-6'>Si buscas...</h3>
          <ul className='list-disc ml-6'>
            <li>
              Encuentra una amplia variedad de profesionales cualificados para tus proyectos de mejora del hogar, como electricistas, plomeros, pintores y más
            </li>
            <li>
              Conecta fácilmente con expertos en el área que necesitas y revisa reseñas auténticas para contratar con total confianza
            </li>
            <li>
              Crea una oferta laboral de emergencia para resolver problemas urgentes
            </li>
          </ul>
        </div>

        <div className='bg-brand2 p-6 rounded-2xl text-brand8 w-[90%] mx-auto'>
          <h3 className='text-2xl text-pretty mb-6'>Si ofreces...</h3>
          <ul className='list-disc ml-6'>
            <li>
              Destaca tu experiencia y habilidades para ser contratado por clientes que buscan tus servicios
            </li>
            <li>
              Mejora tu reputación generada por tus trabajos realizados y aumenta el alcance de tu público al ser recomendado por la plataforma
            </li>
            <li>
              Amplía tu base de clientes y haz crecer tu negocio, aprovechando la exposición y la confianza que nuestra plataforma ofrece
            </li>
          </ul>
        </div>
      </section>

      <section className='mx-auto my-32 w-[90vw] max-w-[900px]'>
        <h1 className='mb-2 text-3xl lg:text-5xl font-semibold'>Únete a la Plataforma</h1>
        <p className='text-balance text-md lg:text-2xl'>Quienes buscan servicios confían en nuestra plataforma para encontrar profesionales cualificados para sus proyectos. Quienes ofrecen servicios apuestan por nosotros para conectarse con clientes potenciales y hacer crecer su negocio.</p>

        <div className='mx-auto mb-5 mt-12 flex flex-wrap items-center justify-center gap-4'>
          {categories.map((item) => (
            <Tag key={item.id} nombre={item.name} />
          ))}
        </div>
      </section>
    </>
  )
}

export default Home
