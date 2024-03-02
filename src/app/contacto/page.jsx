import Link from 'next/link'

function ContactPage () {
  return (
    <main className='min-h-screen bg-brand1 text-brand8 p-10'>
      <Link href='/' className='font-semibold hover:underline underline-offset-4'>Ir al inicio</Link>
      <h1 className='text-4xl font-semibold mt-10'>¿En que podemos ayudarte?</h1>
    </main>
  )
}

export default ContactPage
