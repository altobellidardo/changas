/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
// import UpIcon from '@/components/icons/UpIcon'

function CounterDealForm () {
  const searchParams = useSearchParams()
  // Get ID of the user and of the contract
  const IdUser = searchParams.get('IdUser')
  const IdContract = searchParams.get('IdContract')

  // Set variables that will be completed with data from the contract fetch
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [jobtitle, setJobTitle] = useState()
  const [IdWorker, setIdWorker] = useState()
  const [IdContractor, setIdContractor] = useState()
  const [description, setDescription] = useState()
  const [date, setDate] = useState()
  const [budget, setBudget] = useState()
  const [category, setCategory] = useState()
  const [payformat, setPayFormat] = useState()
  const [workerTurn, setWorkerTurn] = useState()

  // Fetch contract data from the users
  const fetchContract = async () => {
    const response = await fetch(`/api/get-contract?id_contract=${IdContract}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    })
    const data = (await response.json()).contract
    // Set variables according to existing contract
    setJobTitle(data.title)
    setIdWorker(data.id_worker)
    setIdContractor(data.id_contractor)
    setDescription(data.description)
    setDate(data.date)
    setCategory(data.category)
    setBudget(data.budget)
    setPayFormat(data.changas_pay)
    setWorkerTurn(data.worker_turn)
    return data
  }

  useEffect(() => {
    fetchContract()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)
    const jobtitle = formData.get('jobtitle')
    const date = formData.get('date')
    const budget = formData.get('budget')
    const description = formData.get('description')
    const payformat = formData.get('payformat')

    const sendData = {
      IdContract,
      IdUser,
      IdWorker,
      IdContractor,
      jobtitle,
      date,
      budget,
      description,
      payformat,
      workerTurn
    }
    console.log(sendData)
    setLoading(true)
    setError(null)

    const response = await fetch('/api/forms/update-contract', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sendData)
    })
    setLoading(false)
    const data = await response.json()

    if (data.error) setError(data.error)
    if (data.status === 200) window.location.href = '/'
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-2 w-96 p-6'>
      <label htmlFor='jobtitle'>Título del trabajo</label>
      <input id='jobtitle' className='border-2 p-2 rounded' type='jobtitle' name='jobtitle' defaultValue={jobtitle} />
      <p>Tipo de trabajo {category}</p>
      <label htmlFor='description'>Descripción del trabajo</label>
      <input id='description' className='border-2 p-2 rounded' type='description' name='description' defaultValue={description} />
      <label htmlFor='budget'>Presupuesto</label>
      <input id='budget' className='border-2 p-2 rounded' type='number' step='1' min='1' name='budget' defaultValue={budget} />
      <label htmlFor='date'>Fecha del trabajo</label>
      <input id='date' className='border-2 p-2 rounded' type='date' name='date' min={new Date().toISOString().split('T')[0]} defaultValue={date} />
      <p>Medio de pago</p>
      <div className='flex items-center'>
        <input type='radio' id='changas' name='payformat' value='changas' className='form-radio h-5 w-5 text-blue-600' defaultChecked={payformat} />
        <label className='ml-2' htmlFor='changas'>Changas</label>
      </div>
      <div className='flex items-center'>
        <input type='radio' id='other' name='payformat' value='other' className='form-radio h-5 w-5 text-blue-600' defaultChecked={!payformat} />
        <label className='ml-2' htmlFor='other'>Otros medios</label>
      </div>
      <button disabled={loading} className='rounded-xl border-2 border-brand6 bg-brand6 px-4 py-2 font-semibold text-brand8 hover:text-brand1 disabled:opacity-50' type='submit'>Contraofertar</button>
      <span className={`${error ? 'block' : 'hidden'} text-red-600 bg-red-200 border-2 rounded-lg p-2 border-red-600`}>{error}</span>
    </form>
  )
}

export default CounterDealForm
