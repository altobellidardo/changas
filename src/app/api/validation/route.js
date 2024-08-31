import supabase from '@/libs/supabase/server'

import messages from '@/utils/messages'
import { NextRequest, NextResponse } from 'next/server'

export async function POST (request) {
  const req = new NextRequest(request)
  const formData = await req.formData()

  const name = formData.get('name')
  const photo = formData.get('photo')

  const { data, error } = await supabase
    .storage
    .from('validation')
    .upload(`photo_${name}`, photo)

  if (data) {
    console.log({ data })
  }
  if (error) {
    console.log({ error })
  }

  return NextResponse.json({ message: messages.success.user_created }, { status: 200 })
}

/* supabase storage api response
{
  error: {
    statusCode: '409',
    error: 'Duplicate',
    message: 'The resource already exists'
  }
}
{
  data: {
    path: 'photo_vemos',
    id: '7655fe72-cf2f-45f5-b97f-42867240e193',
    fullPath: 'validation/photo_vemos'
  }
}
*/
