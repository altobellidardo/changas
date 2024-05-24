import Footer from '@/components/footer'
import Header from '@/components/header/header'
import { getContractsUsers } from '@/actions/getContractsUsers'
import Link from 'next/link'
import Contract from '../../components/Contract'

export const dynamic = 'force-dynamic'

async function ContractPage ({ searchParams }) {
  const { IdUser, OtherUser, idChat } = searchParams

  const contracts = await getContractsUsers(IdUser, OtherUser)

  return (
    <main className='min-h-screen flex flex-col justify-between'>
      <Header />
      <section className='pt-10 max-w-[80vw] mx-auto my-10'>
        <Link href={`/chats/${idChat}`} className='text-brand6 hover:underline'>Atrás</Link>
        <h1 className='text-3xl font-bold'>Tus contratos</h1>

        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          {
            contracts.length === 0
              ? (
                <div>No hay contratos registrados</div>
                )
              : contracts.map((item) => (
                <Contract contract={item} IdUser={IdUser} IdChat={idChat} key={item.id_contract} />
              ))
          }
        </div>
      </section>
      <Footer />
    </main>
  )
}

export default ContractPage
