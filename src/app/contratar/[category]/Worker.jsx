import Link from 'next/link'

function Worker ({ worker, IdUser }) {
  return (
    <section>
      <header>
        <span className='font-bold '>{worker.username}</span>
        <div>
          <span>{worker.location}</span>
        </div>
      </header>
      <footer>
        <span>${worker.hourly_price}/h</span>
      </footer>
    </section>
    // <div className='p-4 border-2 rounded-xl border-brand6 bg-brand6/10'>
    //   <span className='opacity-60 text-sm'>Nombre y apellido</span>
    //   <div>{worker.username}</div>
    //   <span className='opacity-60 text-sm'>Precio por hora</span>
    //   <div>${worker.hourly_price}/h</div>
    //   <span className='opacity-60 text-sm'>N° de empleados</span>
    //   <div>{worker.employees}</div>
    //   <span className='opacity-60 text-sm'>Horas de búsqueda</span>
    //   <div>{worker.attention_hours}</div>
    //   <span className='opacity-60 text-sm'>Descripción</span>
    //   <div>{worker.description}</div>
    //   <span className='opacity-60 text-sm'>Puntaje</span>
    //   <div>{worker.score}/5</div>
    //   {/* {worker.id_user !== IdUser
    //     ? <Link href={`/chats/nuevochat?idUser2=${worker.id_user}&Username2=${worker.username}`} className='hover:underline'>Contactar</Link>
    //     : undefined} */}
    //   {worker.id_user !== IdUser &&
    //     <Link href={`/chats/nuevochat?idUser2=${worker.id_user}&Username2=${worker.username}`} className='hover:underline'>Contactar</Link>}
    // </div>
  )
}

export default Worker
