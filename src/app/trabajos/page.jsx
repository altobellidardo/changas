/* eslint-disable @next/next/no-img-element */
import Footer from '@/components/footer'
import Header from '@/components/header/header'
import supabase from '@/libs/supabase/server'
import JobBanner from '@/components/JobBanner'

// update fetch to 60 minutes
export const revalidate = 3600

const { data: categories } = await supabase.from('categories').select('*')

function TrabajosPage () {
  return (
    <main className='min-h-screen text-brand1 bg-brand8'>
      <Header />

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-[1200px] mx-auto my-10'>
        {categories.map((item) => (
          <JobBanner key={item.name} info={item} />
        ))}
      </div>

      <section className='bg-brand8 text-brand1 pt-5 pb-20 font-bold text-center text-xl'>
        <p>Próximamente más trabajos</p>
      </section>
      <Footer />
    </main>
  )
}

export default TrabajosPage
