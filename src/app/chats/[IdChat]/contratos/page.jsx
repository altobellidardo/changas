import Footer from '@/components/footer'
import Header from '@/components/header/header'
import { getContractsUsers } from '@/actions/getContractsUsers'
import Link from 'next/link'

function Contract ({ contract }) {
  return (
    <div className='p-4 border-2 border-brand5/50 rounded-md m-2 w-96'>
      <div>Título del contrato: {contract.title}</div>
      <div>Categoría del trabajo: {contract.category}</div>
      <div>Presupuesto: {contract.budget}</div>
      <div>Descripción del trabajo: {contract.description}</div>
      <div>Fecha del trabajo: {new Date(contract.date).toISOString().split('T')[0]}</div>
      <div>Cerrado: {contract.closed === true ? 'True' : 'False'}</div>
      <div>Pago por changas: {contract.changas_pay === true ? 'True' : 'False'}</div>
    </div>
  )
}

async function ContractPage ({ searchParams }) {
  const IdUser = searchParams.IdUser
  const OtherUser = searchParams.OtherUser
  const IdChat = searchParams.IdChat
  const contracts = await getContractsUsers(IdUser, OtherUser)
  return (
    <main className='min-h-screen flex flex-col justify-between'>
      <Header />
      <section className='pt-10 max-w-[80vw] mx-auto my-10'>
        <Link href={`/chats/${IdChat}`} className='text-brand6 hover:underline'>Atrás</Link>
        <h1 className='text-3xl font-bold'>Tus contratos</h1>

        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          {
            contracts.length === 0
              ? (
                <div>No hay contratos registrados</div>
                )
              : contracts.map((item) => (
                <Contract contract={item} key={item.id_contract} />
              ))
          }
        </div>
      </section>
      <Footer />
    </main>
  )
}

export default ContractPage
