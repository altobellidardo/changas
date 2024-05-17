'use client'

import { useState } from 'react'
import PenIcon from './icons/PenIcon'
import formatDate from '@/utils/formateDate'
import LocationIcon from './icons/LocationIcon'

function ProfileCard ({ user }) {
  // Get useful variables
  const username = user.name + ' ' + user.surname
  const IdUser = user.id_user

  const [editMode, setEditMode] = useState(false)
  const [loading, setLoading] = useState(false)

  const toggleEditMode = () => {
    setEditMode(!editMode)
  }

  const handleSubmit = async (userdata) => {
    userdata.preventDefault()

    setLoading(true)

    const sendData = { IdUser, phone: userdata.target.phone.value }
    const response = await fetch('/api/update/user-data', {
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
    <section className='flex flex-col md:flex-row items-center bg-brand4 text-brand8 justify-center gap-8 py-10 md:w-[80vw] mx-auto rounded-md'>
      <picture className='relative'>
        <button onClick={toggleEditMode} className='text-brand8 absolute right-0 bg-brand3 p-2 rounded-full hover:bg-brand5'>
          <PenIcon />
        </button>
        <img className='rounded-full size-40' src={user.picture} alt={`${username} picture`} />
      </picture>

      {editMode
        ? (
          <form onSubmit={handleSubmit} className='grid grid-cols-2 gap-x-4 gap-y-2'>
            <label htmlFor='phone'>Teléfono</label>
            <input type='number' name='phone' id='phone' defaultValue={user.phone} className='text-black p-1 rounded-md' />
            <button disabled={loading} className='rounded-xl border-2 border-brand6 bg-brand6 px-4 py-2 font-semibold text-brand8 hover:text-brand1 disabled:opacity-50' type='submit'>
              Actualizar
            </button>
          </form>
          )
        : (
          <div>
            <div className='font-bold text-xl'>{username}</div>
            <div>{user.email}</div>
            <div>Teléfono: {user.phone}</div>
            <div className='flex'>
              <LocationIcon /> {user.location}
            </div>
            <div>DNI: {user.dni}</div>
            <div>{formatDate(user.birth)}</div>
          </div>
          )}
    </section>
  )
}

export default ProfileCard
