/* eslint-disable @next/next/no-img-element */
import Footer from '@/components/footer'
import Header from '@/components/header/header'
import supabase from '@/libs/supabase/server'
import JobBanner from '@/components/JobBanner'

const { data: categories } = await supabase.from('categories').select('*')

function TrabajosPage () {
  return (
    <main className='min-h-screen text-brand1'>
      <Header />
      <section className='grid grid-cols-1 md:grid-cols-2 p-10 gap-10 bg-brand8'>
        {categories.map((info) => (
          <JobBanner key={info.id} info={info} />
        ))}
      </section>
      <section className='bg-brand8 text-brand1 pt-5 pb-20 font-bold text-center text-xl'>
        <p>Próximamente más trabajos</p>
      </section>
      <Footer />
    </main>
  )
}

export default TrabajosPage
