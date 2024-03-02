'use client'

function LoginForm () {
  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Iniciando sesión')
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-4 max-w-[400px] mx-auto border-2 border-brand1 rounded-lg p-6 my-5'>
      <label>
        <p className='font-semibold'>Email</p>
        <input className='w-full outline rounded-md outline-2 p-2' type='email' />
      </label>
      <label>
        <p className='font-semibold'>Password</p>
        <input className='w-full outline rounded-md outline-2 p-2' type='password' />
      </label>
      <button className='font-semibold border-2 border-brand6 text-brand6 rounded-xl px-4 py-2 hover:text-brand1 hover:bg-brand6' type='submit'>
        Iniciar sesión
      </button>
    </form>
  )
}

export default LoginForm
