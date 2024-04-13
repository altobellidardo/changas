import Footer from '@/components/footer'
import Header from '@/components/header/header'
import { getContractsUsers } from '@/actions/getContractsUsers'
import Link from 'next/link'

function Contract ({ contract, IdUser, IdChat }) {
  // Define whether to show or not the Review link to the user
  const DealOrLink = () => {
    const isWorker = IdUser === contract.id_worker
    const now = new Date().setHours(0, 0, 0, 0)
    if (contract.closed === true && now >= new Date(contract.date)) {
      if (contract.score) {
        return <div>Puntaje de reseña: {contract.score}</div>
      } else if (!isWorker) {
        return <Link href={{ pathname: '/criticar/', query: { ReviewerId: IdUser, ReviewedId: contract.id_worker, IdContract: contract.id_contract, Category: contract.category } }} className='text-brand6 hover:underline'>Reseñar</Link>
      } else {
        return null
      }
    } else if (contract.closed !== true && now < new Date(contract.date) && ((contract.worker_turn && isWorker) || (!contract.worker_turn && !isWorker))) {
      return <Link href={{ pathname: `/chats/${IdChat}/contraofertar/`, query: { IdContract: contract.id_contract, IdUser } }} className='text-brand6 hover:underline'>Contraofertar</Link>
    }
  }
  return (
    <div className='p-4 border-2 border-brand5/50 rounded-md m-2 w-96'>
      <div>Título del contrato: {contract.title}</div>
      <div>Categoría del trabajo: {contract.category}</div>
      <div>Presupuesto: {contract.budget}</div>
      <div>Descripción del trabajo: {contract.description}</div>
      <div>Fecha del trabajo: {new Date(contract.date).toISOString().split('T')[0]}</div>
      <div>Cerrado: {contract.closed === true ? 'True' : 'False'}</div>
      <div>Pago por changas: {contract.changas_pay === true ? 'True' : 'False'}</div>
      <DealOrLink />
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
                <Contract contract={item} IdUser={IdUser} IdChat={IdChat} key={item.id_contract} />
              ))
          }
        </div>
      </section>
      <Footer />
    </main>
  )
}

export default ContractPage
