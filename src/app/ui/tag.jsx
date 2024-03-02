function Tag ({ nombre }) {
  return (
    <span className='font-semibold px-6 py-2 border-2 border-brand6 rounded-full text-brand6 hover:text-brand8 hover:bg-brand6'>
      {nombre}
    </span>
  )
}

export default Tag
