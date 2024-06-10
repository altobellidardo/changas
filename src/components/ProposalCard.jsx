'use client'

import { useState } from 'react'
import SwitchMode from './SwitchMode'
import ProposalInfo from './ProposalInfo'
import messages from '@/utils/messages'

function ProposalEdit ({ proposal, handleSubmit, loading, error }) {
  return (
    <form onSubmit={handleSubmit} className='grid grid-cols-2 gap-x-4 gap-y-2'>
      <p>Categoria</p>
      <p>{proposal.category}</p>
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
      <button disabled={loading} className='rounded-xl bg-brand6 px-4 py-2 font-semibold text-brand8 hover:bg-brand2 disabled:opacity-50' type='submit'>
        {loading ? 'Cargando...' : 'Guardar'}
      </button>
      <span className={`${error ? 'block' : 'hidden'} text-red-600 bg-red-200 border-2 rounded-lg p-2 border-red-600`}>{error}</span>
    </form>
  )
}

function ProposalCard ({ proposal }) {
  const [editMode, setEditMode] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const toggleEditMode = () => {
    setEditMode(!editMode)
    setError(false)
  }

  const handleSubmit = async (proposaldata) => {
    proposaldata.preventDefault()

    setLoading(true)
    setError(false)

    if (proposaldata.target.budget.value === '' || proposaldata.target.city.value === '' || proposaldata.target.province.value === '' || proposaldata.target.country.value === '' || proposaldata.target.description.value === '') {
      setError(messages.error.form_field_required)
      setLoading(false)
    } else {
      const sendData = {
        IdProposal: proposal.id_proposal,
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
        setError(data.error)
      } else {
        // If there is not any problem the page is refreshed
        window.location.reload()
      }
      setLoading(false)
    }
  }

  return (
    <li className='p-4 border-2 mb-2 mx-2 rounded-xl border-brand4/40 flex flex-col gap-1'>
      <SwitchMode toggleEditMode={toggleEditMode} editMode={editMode} />
      {editMode
        ? <ProposalEdit proposal={proposal} handleSubmit={handleSubmit} loading={loading} error={error} />
        : <ProposalInfo proposal={proposal} />}
    </li>
  )
}

export default ProposalCard
