import Header from '@/components/header'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

async function AuthLayout ({ children }) {
  const supabase = createClient()

  const { data } = await supabase.auth.getUser()
  // console.log(data)
  if (data.user) {
    redirect('/')
  }

  return (
    <main>
      <Header />
      {children}
    </main>
  )
}

export default AuthLayout
