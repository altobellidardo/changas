import Link from 'next/link'

function NosotrosPage () {
  return (
    <main className='min-h-screen bg-brand1 p-10 text-brand8'>
      <Link href='/' className='font-semibold underline-offset-4 hover:underline'>Ir al inicio</Link>
      <h1 className='mt-10 text-4xl font-semibold'>Acerca de Nosotros</h1>

      <section>
        <p>Changas es una plataforma para emplear trabajadores por un periodo de tiempo determinado</p>
      </section>
    </main>
  )
}

export default NosotrosPage
