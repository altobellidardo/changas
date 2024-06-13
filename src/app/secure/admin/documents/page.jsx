import Footer from '@/components/footer'
import Header from '@/components/header/header'

export const fetchCache = 'force-no-store'
export const dynamic = 'force-dynamic'

async function DocumentValidationPage () {
  return (
    <main className='min-h-screen flex flex-col justify-between'>
      <Header />
      <Footer />
    </main>
  )
}

export default DocumentValidationPage
