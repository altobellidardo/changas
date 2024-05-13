import { getCategories } from '@/actions/getCategories'
import Footer from '@/components/footer'
import Header from '@/components/header/header'
import FiltersPostularse from './filters'

export const fetchCache = 'force-no-store'
export const dynamic = 'force-dynamic'

async function FindJobPage () {
  const categories = await getCategories()

  return (
    <main className='min-h-screen flex flex-col justify-between'>
      <Header />
      <section className='pt-10 max-w-[80vw] mx-auto my-10'>
        <h1 className='text-3xl font-bold'>Contratar </h1>
        <p className='mb-4'>
          Hay {categories.length} {categories.length === 1 ? 'oficio' : 'oficios'} disponibles
        </p>

        <FiltersPostularse categories={categories} />
      </section>
      <Footer />
    </main>
  )
}

export default FindJobPage
