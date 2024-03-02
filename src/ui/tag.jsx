function Tag ({ nombre }) {
  return (
    <span className='font-semibold border-2 border-brand6 text-brand6 hover:bg-brand6 hover:text-brand1 px-6 py-2 rounded-full'>
      {nombre}
    </span>
  )
}

export default Tag
