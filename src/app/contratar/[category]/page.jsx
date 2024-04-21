import Footer from '@/components/footer'
import Header from '@/components/header/header'
import Link from 'next/link'
import Filters from './filters'

export const dynamic = 'force-dynamic'

export default async function JobWorkers ({ params }) {
  let { category } = params
  // clean %20 in string
  category = category.replace(/%20/g, ' ')

  return (
    <main className='min-h-screen flex flex-col justify-between'>
      <Header />
      <section className='pt-10 max-w-[80vw] mx-auto my-10'>
        <Link href='/contratar' className='text-brand6 hover:underline mb-2'>Atrás</Link>
        <h1 className='text-3xl font-bold mb-4'>Contratar {category}</h1>

        <Filters category={category} />
      </section>
      <Footer />
    </main>
  )
}
