'use client'

import { useState } from 'react'
import PenIcon from './icons/PenIcon'
import formatDate from '@/utils/formateDate'
import LocationIcon from './icons/LocationIcon'

function ProfileCard ({ user }) {
  const username = user.name + ' ' + user.surname

  const [editMode, setEditMode] = useState(false)

  const toggleEditMode = () => {
    setEditMode(!editMode)
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
          <form className='grid grid-cols-2 gap-x-4 gap-y-2'>
            <label htmlFor='phone'>Teléfono</label>
            <input type='text' name='phone' id='phone' defaultValue={user.phone} className='text-black p-1 rounded-md' />
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
