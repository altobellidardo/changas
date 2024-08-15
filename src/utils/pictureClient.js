const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const API_IMG = 'https://avatar.iran.liara.run/public/boy?username='

export function getPicURL (user, idUser) {
  if (!user.username) {
    user.username = user.name + ' ' + user.surname
  }

  let picURL
  if (user.picture) {
    picURL = SUPABASE_URL + '/storage/v1/object/public/profiles/' + idUser
  } else {
    picURL = API_IMG + user.username
  }

  return picURL
}
