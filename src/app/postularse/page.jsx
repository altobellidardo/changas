import { getCategories } from '@/actions/getCategories'
import JobBanner from '@/components/JobBanner'
import Footer from '@/components/footer'
import Header from '@/components/header/header'

export const dynamic = 'force-dynamic'

async function FindJobPage () {
  const categories = await getCategories()

  return (
    <main className='min-h-screen flex flex-col justify-between'>
      <Header />
      <section className='pt-10 max-w-[80vw] mx-auto my-10'>
        <h1 className='text-3xl font-bold'>Ofertas laborales </h1>
        <p className='mb-4'>
          Hay {categories.length} {categories.length === 1 ? 'oficio' : 'oficios'} disponibles
        </p>

        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 max-w-[1200px]'>
          {
            categories.map((item) => (
              <JobBanner key={item.name} info={item} link={`/postularse/${item.name}?page=0`} />
            ))
          }
        </div>
      </section>
      <Footer />
    </main>
  )
}

export default FindJobPage
