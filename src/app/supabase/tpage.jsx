'use client'
import { createClient } from '@supabase/supabase-js'
import { useState, useEffect } from 'react'

function createClerkSupabaseClient () {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
    process.env.NEXT_PUBLIC_SUPABASE_KEY ?? '',
    {
      global: {
        // Get the Supabase token with a custom fetch method
        fetch: async (url, options = {}) => {
          const clerkToken = await window.Clerk.session?.getToken({
            template: 'supabase'
          })

          // Construct fetch headers
          const headers = new Headers(options?.headers)
          headers.set('Authorization', `Bearer ${clerkToken}`)

          // Now call the default fetch
          return fetch(url, {
            ...options,
            headers
          })
        }
      }
    }
  )
}

const client = createClerkSupabaseClient()

export default function Supabase () {
  const [addresses, setAddresses] = useState([])

  const listAddresses = async () => {
    // Fetches all addresses scoped to the user
    // Replace "Addresses" with your table name
    const { data, error } = await client.from('Posts').select()
    if (!error) setAddresses(data)
    else console.log(error)
  }

  useEffect(() => {
    listAddresses()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const inputContent = e.target.content.value

    await client.from('Posts').insert({
      // Replace content with whatever field you want
      content: inputContent
    })
  }

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <form onSubmit={handleSubmit}>
          <input type='text' name='content' style={{ color: 'black' }} />
          <button type='submit'>Submit</button>
        </form>

        <button onClick={listAddresses}>
          Fetch Addresses
        </button>
      </div>

      <h2>Addresses</h2>

      {addresses.length === 0
        ? <p>No addresses</p>
        : (
          <ul>
            {addresses.map((address) => (
              <li key={address.id}>{address.content}</li>
            ))}
          </ul>
          )}
    </>
  )
}
