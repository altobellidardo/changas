'use client'

import Link from 'next/link'

// Function to close the contract (accept it)
const closeContract = async (IdContract, IdUser, IdWorker, IdContractor, workerTurn) => {
  const sendData = { IdContract, IdUser, IdWorker, IdContractor, workerTurn }
  await fetch('/api/contract-handlers/close-contract', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(sendData)
  })
  // Once the contract is accepted the page is reloaded
  window.location.reload()
}

// Function to reject the contract (delete it)
const rejectContract = async (IdContract, IdUser, IdWorker, IdContractor, workerTurn) => {
  await fetch(`/api/contract-handlers/reject-contract?workerTurn=${workerTurn}&IdUser=${IdUser}&IdWorker=${IdWorker}&IdContractor=${IdContractor}&IdContract=${IdContract}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  // Once the contract is deleted the page is reloaded
  window.location.reload()
}

function Contract ({ contract, IdUser, IdChat }) {
  // Define whether to show or not the Review link to the user
  const DealOrLink = () => {
    const isWorker = IdUser === contract.id_worker
    const now = (new Date()).getTime()
    const date = (new Date(contract.date)).getTime()
    if (contract.closed === true && now >= date) {
      if (contract.score) {
        return <div>Puntaje de reseña: {contract.score}</div>
      } else if (!isWorker) {
        return <Link href={{ pathname: '/criticar/', query: { ReviewerId: IdUser, ReviewedId: contract.id_worker, IdContract: contract.id_contract, Category: contract.category } }} className='text-brand6 hover:underline'>Reseñar</Link>
      } else {
        return null
      }
    } else if (contract.closed !== true && now <= date && ((contract.worker_turn && isWorker) || (!contract.worker_turn && !isWorker))) {
      return (
        <div>
          <Link href={{ pathname: `/chats/${IdChat}/contraofertar/`, query: { IdContract: contract.id_contract, IdUser } }} className='text-brand6 hover:underline'>Contraofertar</Link>|
          <button onClick={() => closeContract(contract.id_contract, IdUser, contract.id_worker, contract.id_contractor, contract.worker_turn)} className='text-brand6 hover:underline'>Aceptar</button>|
          <button onClick={() => rejectContract(contract.id_contract, IdUser, contract.id_worker, contract.id_contractor, contract.worker_turn)} className='text-brand6 hover:underline'>Rechazar</button>
        </div>
      )
    } else if (contract.closed !== true && now > date && ((contract.worker_turn && isWorker) || (!contract.worker_turn && !isWorker))) {
      return (
        <div>
          <button onClick={() => rejectContract(contract.id_contract, IdUser, contract.id_worker, contract.id_contractor, contract.worker_turn)} className='text-brand6 hover:underline'>Rechazar</button>
        </div>
      )
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

export default Contract
