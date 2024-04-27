import { getProposals } from '@/actions/getProposals'
import Footer from '@/components/footer'
import Header from '@/components/header/header'
import formatDate from '@/utils/formateDate'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

function Proposal ({ info }) {
  return (
    <div className='p-4 border-2 rounded-xl border-brand6 bg-brand6/10 w-96'>
      <span className='opacity-60 text-sm'>Presupuesto</span>
      <div>{info.budget}</div>
      <span className='opacity-60 text-sm'>Ubicacion</span>
      <div>{info.location}</div>
      <span className='opacity-60 text-sm'>Fecha de publicación</span>
      <div>{formatDate(info.open_date.slice(0, 10))}</div>
      <span className='opacity-60 text-sm'>Descripcion</span>
      <div>{info.description}</div>
      <Link href={`/contratar/${info.id_proposal}`} className='hover:underline'>Contratar</Link>
    </div>
  )
}

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
        <>
          {proposals.length === 0
            ? <div>No hay ofertas de {category} disponibles</div>
            : proposals.map((item) => (
              <Proposal key={item.id_proposal} info={item} />
            ))}
        </>
      </section>
      <Footer />
    </main>
  )
}
