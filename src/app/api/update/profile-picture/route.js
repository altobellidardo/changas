// Update profile picture endpoint
import { decode } from 'base64-arraybuffer'
import supabase from '@/libs/supabase/server'
import { NextResponse } from 'next/server'
import messages from '@/utils/messages'

export async function POST (request) {
  const data = await request.json()

  const userData = {
    id_user: data.IdUser,
    picture: data.image !== null // If the file size is 0 there is no such file
  }

  // upload profile picture
  if (userData.picture) {
    const { error: profileFail } = await supabase.storage.from('profiles').upload(userData.id_user, decode(data.image.base64), {
      upsert: true, contentType: 'image/jpeg' // The Expo app sends all images as JPEG
    })
    if (profileFail) {
      return NextResponse.json({ error: messages.error.image_upload_failed })
    }
  }

  return NextResponse.json({ status: 200 })
}
