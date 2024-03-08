import { SignUp } from '@clerk/nextjs'
import '@/app/clerk-styles.css'

export default function Page () {
  return (
    <div className='flex justify-center pt-6  bg-brand1 min-h-screen'>
      <SignUp />
    </div>
  )
}
