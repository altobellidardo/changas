// import { currentUser, UserButton } from '@clerk/nextjs'
import { supabaseServerClient } from '@/utils/supabase/server'

async function DashboardPage () {
  // const user = await currentUser()

  const supabase = await supabaseServerClient()

  const { data } = await supabase.from('Posts').select()

  return (
    <div>
      <h1>Dashboard</h1>
      {/* <h2>{user.firstName} {user.lastName}</h2>
      <h2>{user.emailAddresses[0].emailAddress}</h2>
      <UserButton /> */}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

export default DashboardPage
