'use client'

import { useState } from 'react'

function UploadCritique ({ ReviewerId, ReviewedId, ContractId, Category }) {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)
    const description = formData.get('reviewdesc')
    const score = formData.get('score')

    const sendData = { id_contract: ContractId, id_reviewer_user: ReviewerId, id_reviewed_user: ReviewedId, category: Category, description, score }

    setLoading(true)
    setError(null)

    const response = await fetch('/api/forms/upload-review', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sendData)
    })
    const data = await response.json()

    setLoading(false)

    if (data.error) {
      setError(data.error)
    }

    if (data.message) {
      window.location.href = '/perfil'
    }
  }

  return (
    <section className='flex flex-col mt-20 justify-center items-center'>
      <h1 className='text-3xl font-bold'>
        Reseñar a
      </h1>
      <div> Categoría del trabajo: {Category} </div>
      <form onSubmit={handleSubmit} className='flex flex-col gap-2 w-96 p-6'>
        <label htmlFor='score'>Puntaje (1-5)</label>
        <input id='score' className='border-2 p-2 rounded' type='number' step={1} min={1} max={5} name='score' />
        <label htmlFor='reviewdesc'>Descripción de la reseña</label>
        <input id='reviewdesc' className='border-2 p-2 rounded' name='reviewdesc' />
        <button disabled={loading} className='rounded-xl border-2 border-brand6 bg-brand6 px-4 py-2 font-semibold text-brand8 hover:text-brand1 disabled:opacity-50' type='submit'>Subir reseña</button>
        <span className={`${error ? 'block' : 'hidden'} text-red-600 bg-red-200 border-2 rounded-lg p-2 border-red-600`}>{error}</span>
      </form>
    </section>
  )
}

export default UploadCritique
