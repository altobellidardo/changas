import { decode } from 'base64-arraybuffer'
import supabase from '@/libs/supabase/server'
import { NextResponse } from 'next/server'
import messages from '@/utils/messages'

export async function POST (request) {
  const { IdUser, faceFile, dniFile } = await request.json()

  // Upload DNI and face to be validated by operator
  if (dniFile && faceFile) {
    const { error: dniFail } = await supabase.storage.from('identities').upload(`${IdUser}-dni`, decode(dniFile.base64), {
      contentType: 'image/jpeg' // The Expo app sends all images as JPEG
    })
    if (dniFail) {
      // console.log(dniFail)
      return NextResponse.json({ error: messages.error.validation_upload_failed })
    }
    const { error: faceFail } = await supabase.storage.from('identities').upload(`${IdUser}-face`, decode(faceFile.base64), {
      contentType: 'image/jpeg' // The Expo app sends all images as JPEG
    })
    if (faceFail) {
      // console.log(faceFail)
      return NextResponse.json({ error: messages.error.validation_upload_failed }, { status: 404 })
    }
    const { error: updateFail } = await supabase.from('users_data').update({ status: 'pending' }).eq('id_user', IdUser)
    if (updateFail) {
      // console.log(updateFail)
      return NextResponse.json({ error: messages.error.validation_upload_failed }, { status: 404 })
    }
  } else return NextResponse.json({ error: messages.error.validation_required }, { status: 404 })

  return NextResponse.json({ message: messages.success.validation_uploaded }, { status: 200 })
}
