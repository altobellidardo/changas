'use client'

import { useRef } from 'react'

export function Actions ({ userId, username, email }) {
  const reasonRef = useRef()
  async function action (status) {
    const reason = reasonRef.current.value
    const response = await fetch('api/admin/change-state', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idUser: userId, username, email, status, reason })
    })
    const data = await response.json()

    // console.log(data)
    if (data.error) alert(data.error)
    alert(data.message)
    window.location.reload()
  }

  return (
    <>
      <section className='flex gap-8 mx-auto'>
        <button
          onClick={() => action('verified')}
          className='border border-brand3 bg-brand3/30 text-brand3 px-4 py-2 font-bold rounded-md hover:bg-brand3/50'
        >Aceptar
        </button>
      </section>
      <section className='flex flex-col gap-2 mx-auto mb-10'>
        <label
          htmlFor='reason'
          className='text-red-500 font-bold'
        >Describa la razón del rechazo
        </label>
        <textarea
          ref={reasonRef}
          type='text'
          name='reason'
          id='reason'
          className='text-black px-1 py-2 rounded-md border-2 w-[40vw]'
        />
        <button
          onClick={() => action('rejected')}
          className='border border-red-500 bg-red-200/30 text-red-500 px-4 py-2 font-bold rounded-md hover:bg-red-500/50'
        >Rechazar
        </button>
      </section>
    </>
  )
}
