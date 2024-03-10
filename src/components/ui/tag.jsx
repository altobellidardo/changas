function Tag ({ nombre }) {
  return (
    <span className='rounded-full border-2 border-brand6 px-6 py-2 font-semibold text-brand6 hover:bg-brand6 hover:text-brand8'>
      {nombre}
    </span>
  )
}

export default Tag
