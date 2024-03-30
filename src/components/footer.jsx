/* eslint-disable @next/next/no-img-element */
function Footer () {
  return (
    <footer className='bg-brand1 p-10 text-brand8 h-32 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6'>
      <div className='flex items-center justify-center gap-3'>
        <img src='/logo.svg' alt='logo' className='size-9' />
        <span className='font-semibold text-2xl'>Changas</span>
      </div>
      <span className='text-xs text-center text-pretty'>
        © {new Date().getFullYear()} Changas™. Todos los derechos reservados.
      </span>
    </footer>
  )
}

export default Footer
