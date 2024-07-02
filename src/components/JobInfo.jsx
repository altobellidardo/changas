import Link from 'next/link'
import StarIcon from './icons/Star'

function JobInfo ({ job, IdUser }) {
  return (
    <>
      <div>
        <span className='opacity-60 text-sm'>Nombre del oficio</span>
        <p>{job.category}</p>
      </div>
      <div>
        <span className='opacity-60 text-sm'>Precio por hora</span>
        <p>${job.hourly_price}</p>
      </div>
      <div>
        <span className='opacity-60 text-sm'>Ubicación</span>
        <p>{job.location}</p>
      </div>
      <div>
        <span className='opacity-60 text-sm'>Cantidad de empleados</span>
        <p>{job.employees}</p>
      </div>
      <div>
        <span className='opacity-60 text-sm'>Horas de atención</span>
        <p>{job.attention_hours}</p>
      </div>
      <div>
        <span className='opacity-60 text-sm'>Descripción</span>
        <p>{job.description}</p>
      </div>
      <div>
        <span className='opacity-60 text-sm'>Puntaje</span>
        <div className='flex gap-1 text-xl items-center'>
          {job.score}/5
          <StarIcon className='size-5 text-brand5' />
          {
          IdUser
            ? <Link className='ml-2 rounded-xl bg-brand4 text-brand8 px-4 py-2 text-sm align-middle' href={{ pathname: '/perfil/vercriticas', query: { category: job.category, idUser: IdUser } }}>Ver las reseñas </Link>
            : <Link className='ml-2 rounded-xl bg-brand4 text-brand8 px-4 py-2 text-sm align-middle' href={{ pathname: '/perfil/vercriticas', query: { category: job.category } }}>Ver las reseñas</Link>
          }
        </div>
      </div>
    </>
  )
}

export default JobInfo
