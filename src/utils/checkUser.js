import jwt from 'jsonwebtoken'

function checkUser (token) {
  if (!token) return false

  const isValidToken = jwt.verify(token, process.env.JWT_SECRET)
  if (!isValidToken) return false

  return isValidToken
}

export default checkUser
