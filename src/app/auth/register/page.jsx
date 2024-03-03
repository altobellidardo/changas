import Link from 'next/link'
import { signup } from '@/app/auth/actions'

export default function LoginPage () {
  return (
    <form className='flex flex-col gap-4 max-w-[400px] mx-auto border-2 border-brand1 rounded-lg p-6 my-5'>
      <label htmlFor='email' className='font-semibold'>Email:</label>
      <input id='email' name='email' type='email' required className='outline rounded-md outline-2 p-2' />
      <label htmlFor='password' className='font-semibold'>Password:</label>
      <input id='password' name='password' type='password' required className='outline rounded-md outline-2 p-2' />
      <button formAction={signup} className='font-semibold border-2 border-brand6 text-brand6 rounded-xl px-4 py-2 hover:text-brand1 hover:bg-brand6'>Sign up</button>
      <Link href='/auth/login' className='font-semibold text-brand6 hover:text-brand1 w-fit'>Log in</Link>
    </form>
  )
}
