import Link from 'next/link'

function ContactPage () {
  return (
    <main className='min-h-screen bg-brand1 p-10 text-brand8'>
      <Link href='/' className='font-semibold underline-offset-4 hover:underline'>Ir al inicio</Link>
      <h1 className='mt-10 text-4xl font-semibold'>¿En que podemos ayudarte?</h1>
    </main>
  )
}

export default ContactPage
