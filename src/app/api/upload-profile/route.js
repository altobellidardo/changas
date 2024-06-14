import { NextResponse } from 'next/server'
import messages from '@/utils/messages'
import supabase from '@/libs/supabase/server'

export async function POST (request) {
  const profilePicture = request.get('picture')

  // Upload profile picture to Supabase bucket named profiles
  const { error: profileFail } = await supabase.storage.from('profiles')
    .upload('1.png', profilePicture)

  if (profileFail) {
    console.log(profileFail)
    return NextResponse.json({ error: messages.error.error })
  }

  return 'Success'
}
