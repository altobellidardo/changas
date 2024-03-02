import Link from 'next/link'

function NosotrosPage () {
  return (
    <main className='min-h-screen bg-brand1 text-brand8 p-10'>
      <Link href='/' className='font-semibold hover:underline underline-offset-4'>Ir al inicio</Link>
      <h1 className='text-4xl font-semibold mt-10'>Acerca de Nosotros</h1>

      <section>
        <p>Changas es una plataforma para emplear trabajadores por un periodo de tiempo determinado</p>
      </section>
    </main>
  )
}

export default NosotrosPage
