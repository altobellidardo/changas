import formatDate from '@/utils/formateDate'
import Link from 'next/link'

function Proposal ({ info, IdUser }) {
  return (
    <div className='p-4 border-2 rounded-xl border-brand6 bg-brand6/10'>
      <span className='opacity-60 text-sm'>Presupuesto</span>
      <div>${info.budget}</div>
      <span className='opacity-60 text-sm'>Ubicacion</span>
      <div>{info.location}</div>
      <span className='opacity-60 text-sm'>Fecha de publicación</span>
      <div>{formatDate(info.open_date.slice(0, 10))}</div>
      <span className='opacity-60 text-sm'>Descripcion</span>
      <div>{info.description}</div>
      {info.id_user !== IdUser
        ? <Link href={`/chats/nuevochat?idUser2=${info.id_user}&Username2=${info.username}&`} className='hover:underline'>Contactar</Link>
        : undefined}
    </div>
  )
}
export default Proposal
