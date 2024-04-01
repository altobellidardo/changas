import Link from 'next/link'

export default async function Home () {
  return (
    <div className='max-w-xl mx-auto border rounded-lg p-10 mt-32'>
      <h1 className='text-4xl font-semibold text-center'>Bienvenido al chat...</h1>
      <Link href='/chat/1'>maximorulli</Link>
    </div>
  )
}
