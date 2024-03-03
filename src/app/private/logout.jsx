'use client'

export default function LogOut ({ logOut }) {
  return (
    <form action={logOut}>
      <button type='submit'>Log out</button>
    </form>
  )
}
