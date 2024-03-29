import { getCategories } from '@/actions/getCategories'
import Footer from '@/components/footer'
import Header from '@/components/header/header'
import Link from 'next/link'

export const fetchCache = 'force-no-store'

function Category ({ category }) {
  return (
    <div className='p-4 border-2 rounded-xl border-brand6 bg-brand6/10'>
      <Link className='text-xl font-bold hover:underline' href={`/contratar/${category.name}`}>
        {category.name}s
      </Link>
      <p>{category.description}</p>
    </div>
  )
}

async function FindWorkerPage () {
  const categories = await getCategories()

  return (
    <main className='min-h-screen flex flex-col justify-between'>
      <Header />
      <section className='pt-10 max-w-[80vw] mx-auto my-10'>
        <h1 className='text-3xl font-bold'>Contratar </h1>
        <p className='mb-4'>
          Hay {categories.length} {categories.length === 1 ? 'oficio' : 'oficios'} disponibles
        </p>

        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          {
            categories.map((item) => (
              <Category key={item.name} category={item} />
            ))
          }
        </div>
      </section>
      <Footer />
    </main>
  )
}

export default FindWorkerPage
