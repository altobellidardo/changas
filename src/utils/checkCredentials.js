import messages from '@/utils/messages'

function isValidEmail (email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

function checkCredentials (email, password) {
  if (!email) {
    return { error: messages.error.email_required, status: 400 }
  }
  if (!password) {
    return { error: messages.error.password_required, status: 400 }
  }
  if (password.length < 8) {
    return { error: messages.error.password_invalid, status: 400 }
  }
  if (!isValidEmail(email)) {
    return { error: messages.error.email_invalid, status: 400 }
  }

  return { error: undefined }
}

export default checkCredentials
