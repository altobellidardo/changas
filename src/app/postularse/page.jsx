import { getCategories } from '@/actions/getCategories'
import Footer from '@/components/footer'
import Header from '@/components/header/header'
import FiltersPostularse from './filters'

export const dynamic = 'force-dynamic'

async function FindJobPage () {
  const categories = await getCategories()

  return (
    <main className='min-h-screen flex flex-col justify-between'>
      <Header />
      <FiltersPostularse initial={categories} />
      <Footer />
    </main>
  )
}

export default FindJobPage
