'use client'

export function Actions ({ userId }) {
  async function action (status) {
    const response = await fetch('api/admin/change-state', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idUser: userId, status })
    })
    const data = await response.json()

    console.log(data)
    if (data.error) alert(data.error)
    alert(data.message)
    window.location.reload()
  }

  return (
    <section className='flex gap-8 mx-auto my-10'>
      <button
        onClick={() => action('verified')}
        className='border border-brand3 bg-brand3/30 text-brand3 px-4 py-2 font-bold rounded-md hover:bg-brand3/50'
      >Aceptar
      </button>
      <button
        onClick={() => action('rejected')}
        className='border border-red-500 bg-red-200/30 text-red-500 px-4 py-2 font-bold rounded-md hover:bg-red-500/50'
      >Rechazar
      </button>
    </section>
  )
}
