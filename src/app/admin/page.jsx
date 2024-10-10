/* eslint-disable @next/next/no-img-element */
import { getPendingUsers, getUserDniImage } from '@/actions/admin'
import checkUser from '@/utils/checkUser'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Actions } from './form'
import { ADMINS } from '@/constants'

// disable cache
export const dynamic = 'force-dynamic'

function formatDate (dateString) {
  // Create a new Date object from the input string (YYYY-MM-DD)
  const date = new Date(dateString)

  // Define an array of month acronyms
  const months = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC']

  // Get the day, month, and year from the Date object
  const day = String(date.getDate()).padStart(2, '0') // Add leading zero if needed
  const monthAcronym = months[date.getMonth()] // Months are zero-indexed
  const year = date.getFullYear()

  // Return the formatted date (DD MMM YYYY)
  return `${day} ${monthAcronym} ${year}`
}

async function Admin () {
  const token = cookies().get('token')
  const isAuthenticated = checkUser(token?.value)
  // Retrieve data from JWT
  const { email: userEmail } = isAuthenticated

  if (!isAuthenticated || !ADMINS.includes(userEmail)) {
    redirect('/')
  }

  // obtener imagenes y token
  const pendingUsers = await getPendingUsers()
  const count = 0

  if (pendingUsers.length === 0) {
    return (
      <main className='flex min-h-screen flex-col bg-brand8'>
        <h1>No hay usuarios pendientes</h1>
      </main>
    )
  }

  const userSelected = pendingUsers[count]
  const userDniImage = await getUserDniImage(userSelected.id_user, 'dni')
  const userImage = await getUserDniImage(userSelected.id_user, 'face')

  return (
    <main className='flex min-h-screen flex-col bg-brand8'>
      <h1>Welcome, {userEmail}</h1>
      <p>Usuarios sin aprobar {pendingUsers.length}</p>

      <section className='flex gap-8 mx-auto mt-20'>
        <section className='text-sm'>
          <h1>Datos</h1>
          <p>
            Nombre y apellido: {userSelected.username}
          </p>
          <p>
            Nacimiento: {formatDate(userSelected.birth)}
          </p>
          <p>
            DNI: {new Intl.NumberFormat('de-DE').format(userSelected.dni)}
          </p>
          <p>
            E-mail: {userSelected.email}
          </p>
          <p>
            ID: {userSelected.id_user}
          </p>
          <p>
            Fecha de creación: {formatDate(userSelected.created_at)}
          </p>
        </section>
        <div className='w-[30vw]'>
          <img src={userDniImage} alt='user-dni' />
        </div>
        <div className='w-[19vw]'>
          <img src={userImage} alt='user-face' />
        </div>
      </section>

      <Actions userId={userSelected.id_user} username={userSelected.username} email={userSelected.email} />
    </main>
  )
}

export default Admin
