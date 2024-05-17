'use client'

import { useState } from 'react'
import PenIcon from './icons/PenIcon'
import formatDate from '@/utils/formateDate'

function ProposalCard ({ proposal }) {
  // Get useful variables
  const IdProposal = proposal.id_proposal

  const [editMode, setEditMode] = useState(false)
  const [loading, setLoading] = useState(false)

  const toggleEditMode = () => {
    setEditMode(!editMode)
  }

  const handleSubmit = async (proposaldata) => {
    proposaldata.preventDefault()

    setLoading(true)

    const sendData = {
      IdProposal,
      budget: proposaldata.target.budget.value,
      country: proposaldata.target.country.value,
      province: proposaldata.target.province.value,
      city: proposaldata.target.city.value,
      description: proposaldata.target.description.value
    }
    const response = await fetch('/api/update/proposal', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sendData)
    })
    const data = await response.json()

    if (data.error) {
      alert(data.error)
    } else {
      // If there is not any problem the page is refreshed
      window.location.reload()
    }
    setLoading(false)
  }

  return (
    <div>
      <picture className='relative'>
        <button onClick={toggleEditMode} className='text-brand8 absolute right-0 bg-brand3 p-2 rounded-full hover:bg-brand5'>
          <PenIcon />
        </button>
      </picture>

      <div>
        {editMode
          ? (
            <form onSubmit={handleSubmit} className='grid grid-cols-2 gap-x-4 gap-y-2'>
              <label htmlFor='budget'>Presupuesto</label>
              <input type='number' min='0' max='200000000' step='1' name='budget' id='budget' defaultValue={proposal.budget} className='text-black p-1 rounded-md' />
              <label htmlFor='country'>País</label>
              <input type='text' name='country' id='country' defaultValue={proposal.location.split(',')[2]} className='text-black p-1 rounded-md' />
              <label htmlFor='province'>Provincia</label>
              <input type='text' name='province' id='province' defaultValue={proposal.location.split(',')[1]} className='text-black p-1 rounded-md' />
              <label htmlFor='city'>Ciudad</label>
              <input type='text' name='city' id='city' defaultValue={proposal.location.split(',')[0]} className='text-black p-1 rounded-md' />
              <label htmlFor='description'>Descripción</label>
              <input type='text' name='description' id='description' defaultValue={proposal.description} className='text-black p-1 rounded-md' />
              <button disabled={loading} className='rounded-xl border-2 border-brand6 bg-brand6 px-4 py-2 font-semibold text-brand8 hover:text-brand1 disabled:opacity-50' type='submit'>
                Actualizar
              </button>
            </form>
            )
          : (
            <li key={proposal.id_proposal} className='p-4 border-2 mb-2 mx-2 rounded-md border-brand4/40'>
              <span className='opacity-60 text-sm'>Categoría</span>
              <div>{proposal.category}</div>
              <span className='opacity-60 text-sm'>Presupuesto</span>
              <div>${proposal.budget}</div>
              <span className='opacity-60 text-sm'>Ubicación</span>
              <div>{proposal.location}</div>
              <span className='opacity-60 text-sm'>Fecha de publicación</span>
              <div>{formatDate(proposal.open_date.slice(0, 10))}</div>
              <span className='opacity-60 text-sm'>Descripción</span>
              <div>{proposal.description}</div>
            </li>
            )}
      </div>
    </div>
  )
}

export default ProposalCard
