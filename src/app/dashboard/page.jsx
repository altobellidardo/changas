import { currentUser, UserButton, auth } from '@clerk/nextjs'
import { createSupabaseClient } from '@/utils/supabase/server'

async function DashboardPage () {
  const user = await currentUser()

  const { getToken } = auth()
  const supabaseToken = await getToken('Supabase')
  console.log(supabaseToken)

  const supabase = createSupabaseClient()
  const { data: todos } = await supabase.from('todos').select('*')

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>{user.firstName} {user.lastName}</h2>
      <h2>{user.emailAddresses[0].emailAddress}</h2>
      <UserButton />

      {todos.map((todo) => (
        <div key={todo.id}>
          <h3 className='text-2xl'>{todo.title}</h3>
          <p>{todo.content}</p>
        </div>
      ))}
    </div>
  )
}

export default DashboardPage
