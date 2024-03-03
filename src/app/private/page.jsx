import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import LogOut from './logout'

async function logOut () {
  'use server'

  const supabase = createClient()
  const { error } = await supabase.auth.signOut()

  if (error) {
    console.log(error)
  }

  redirect('/nosotros')
}

export default async function PrivatePage () {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/auth/login')
  }

  return (
    <>
      <p>Hello {data.user.email}</p>
      <LogOut logOut={logOut} />
    </>
  )
}
