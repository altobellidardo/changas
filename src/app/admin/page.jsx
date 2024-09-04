/* eslint-disable @next/next/no-img-element */
import { getPendingUsers, getUserDniImage } from '@/actions/admin'
import checkUser from '@/utils/checkUser'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Actions } from './form'

const ADMIN_USERS = ['altobellidardo@gmail.com', 'rullimaximoeduardo@gmail.com']

// disable cache
export const dynamic = 'force-dynamic'

// obtener imagenes y token
const pendingUsers = await getPendingUsers()
const count = 0

const userSelected = pendingUsers[count]
const userDniImage = await getUserDniImage(userSelected.id_user, 'dni')
const userImage = await getUserDniImage(userSelected.id_user, 'face')

function Admin () {
  const token = cookies().get('token')
  const isAuthenticated = checkUser(token?.value)
  // Retrieve data from JWT
  const { email: userEmail } = isAuthenticated

  if (!isAuthenticated || !ADMIN_USERS.includes(userEmail)) {
    redirect('/')
  }

  return (
    <main className='flex min-h-screen flex-col bg-brand8'>
      <h1>Welcome, {userEmail}</h1>
      <p>Usuarios sin aprobar {pendingUsers.length}</p>

      <section>
        <p>Datos</p>
        {Object.entries(userSelected).map(([key, value]) => (
          <p key={key}>
            <small>{key}: {value}</small>
          </p>
        ))}
      </section>

      <section className='flex gap-8 mx-auto mt-20'>
        <div className='w-[40vw]'>
          <img src={userDniImage} alt='user-dni' />
        </div>
        <div className='w-[40vw]'>
          <img src={userImage} alt='user-face' />
        </div>
      </section>

      <Actions userId={userSelected.id_user} />
    </main>
  )
}

export default Admin
