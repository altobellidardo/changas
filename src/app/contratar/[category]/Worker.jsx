function Worker ({ worker }) {
  return (
    <div className='p-4 border-2 rounded-xl border-brand6 bg-brand6/10 w-96'>
      <span className='opacity-60 text-sm'>Nombre y apellido</span>
      <div>{worker.username}</div>
      <span className='opacity-60 text-sm'>Precio por hora</span>
      <div>${worker.hourly_price}/h</div>
      <span className='opacity-60 text-sm'>N° de empleados</span>
      <div>{worker.employees}</div>
      <span className='opacity-60 text-sm'>Horas de búsqueda</span>
      <div>{worker.attention_hours}</div>
      <span className='opacity-60 text-sm'>Descripción</span>
      <div>{worker.description}</div>
      <span className='opacity-60 text-sm'>Puntaje</span>
      <div>{worker.score}/5</div>
    </div>
  )
}

export default Worker
