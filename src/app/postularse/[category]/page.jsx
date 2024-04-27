import { getProposals } from '@/actions/getProposals'
import Footer from '@/components/footer'
import Header from '@/components/header/header'
import Link from 'next/link'
import Proposal from './Proposal'

export const dynamic = 'force-dynamic'

export default async function JobProposals ({ params }) {
  const { category } = params
  const proposals = await getProposals(category)

  return (
    <main className='min-h-screen flex flex-col justify-between'>
      <Header />
      <section className='pt-10 w-[80vw] max-w-[1200px] mx-auto my-10'>
        <Link href='/contratar' className='text-brand6 hover:underline mb-2'>Atrás</Link>
        <h1 className='text-3xl font-bold mb-4'>
          Ofertas para {category}
        </h1>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 max-w-[1200px]'>
          {proposals.length === 0
            ? <div>No hay ofertas de {category} disponibles</div>
            : proposals.map((item) => (
              <Proposal key={item.id_proposal} info={item} />
            ))}
        </div>
      </section>
      <Footer />
    </main>
  )
}
