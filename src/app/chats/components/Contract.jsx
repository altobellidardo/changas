'use client'

import { useState } from 'react'

function Contract () {
  const [showContractForm, setShowContractForm] = useState(false)

  const handleContractFormSubmit = (event) => {
    event.preventDefault()
    // You can add your logic here
    console.log('Contract form submitted')
  }

  if (!showContractForm) {
    return (
      <button onClick={() => setShowContractForm(true)}>
        Nuevo contrato
      </button>
    )
  }

  return (
    <form onSubmit={handleContractFormSubmit} className=''>
      <button onClick={() => setShowContractForm(false)}>Cancelar</button>
      <label>
        Título del contrato:
        <input type='text' name='title' />
      </label>
      <label>
        Descripción del contrato:
        <textarea name='description' />
      </label>
      <input type='submit' value='Proponer contrato' />
    </form>
  )
}

export default Contract
