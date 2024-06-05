'use client'

import StarIcon from '@/components/icons/Star'
import formatDate from '@/utils/formateDate'
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

function Contract ({ contract, IdUser, IdChat, OtherUsername }) {
  // Define whether to show or not the Review link to the user

  function ShowDealLink () {
    const isWorker = IdUser === contract.id_worker
    const now = (new Date()).getTime()
    const contractDate = (new Date(contract.date)).getTime()

    const enableReview = now >= contractDate && contract.closed
    const isReviewed = contract.score !== null

    const isUserTurn = (contract.worker_turn && isWorker) || (!contract.worker_turn && !isWorker)

    const canReDeal = !contract.closed && now <= contractDate && isUserTurn
    const isExpired = now > contractDate && !contract.closed && isUserTurn

    function ShowReviewLink () {
      return (
        <Link
          href={{ pathname: '/criticar/', query: { ReviewerId: IdUser, ReviewedId: contract.id_worker, ReviewedUsername: OtherUsername, IdContract: contract.id_contract, Category: contract.category } }}
          className='text-brand6 hover:underline'
        >
          Reseñar
        </Link>
      )
    }

    if (enableReview) {
      if (isReviewed) {
        return (
          <div className='flex gap-1 items-center'>
            {contract.score}/5
            <StarIcon className={`${contract.closed ? 'text-red-500' : 'text-brand6'} size-5`} />
          </div>
        )
      } else if (!isWorker) {
        return <ShowReviewLink />
      }
    } else if (canReDeal) {
      return (
        <div>
          <p className='text-sm mt-8 mb-2'>Opciones</p>
          <div className='flex gap-2'>
            <Link
              href={{ pathname: `/chats/${IdChat}/contraofertar/`, query: { IdContract: contract.id_contract, IdUser } }}
              className='text-brand6 hover:underline'
            >
              Contraofertar
            </Link>
            <span>|</span>
            <button onClick={() => closeContract(contract.id_contract, IdUser, contract.id_worker, contract.id_contractor, contract.worker_turn)} className='text-brand6 hover:underline'>Aceptar</button>
            <span>|</span>
            <button onClick={() => rejectContract(contract.id_contract, IdUser, contract.id_worker, contract.id_contractor, contract.worker_turn)} className='text-brand6 hover:underline'>Rechazar</button>
          </div>
        </div>
      )
    } else if (isExpired) {
      return (
        <div>
          <button onClick={() => rejectContract(contract.id_contract, IdUser, contract.id_worker, contract.id_contractor, contract.worker_turn)} className='text-brand6 hover:underline'>Rechazar</button>
        </div>
      )
    }

    return null
  }

  return (
    <div className={`p-4 border-2 ${contract.closed ? 'border-red-500/80 bg-red-500/5' : 'border-brand6/80 bg-brand6/5'} rounded-md m-2 w-96 flex flex-col gap-2`}>
      <div>
        {
          contract.closed
            ? <p className='font-bold text-red-500'>Contrato cerrado</p>
            : <p className='font-bold text-brand6'>Contrato abierto</p>
        }
      </div>
      <div>
        <p className='font-bold'>{contract.title}</p>
      </div>
      <div>
        <p className='text-sm text-black/80'>Categoría</p>
        <p>{contract.category}</p>
      </div>
      <div>
        <p className='text-sm text-black/80'>Presupuesto</p>
        <p>${contract.budget}</p>
      </div>
      <div>
        <p className='text-sm text-black/80'>Descripción</p>
        <p>{contract.description}</p>
      </div>
      <div>
        <p className='text-sm text-black/80'>Fecha</p>
        <p>{formatDate(contract.date)}</p>
      </div>

      <div>
        {
          contract.changas_pay
            ? <p className='font-bold text-brand6'>Pago por Changas</p>
            : <p className='text-sm text-black/80'>Pago fuera de Changas</p>
        }
      </div>

      <ShowDealLink />
    </div>
  )
}

export default Contract
