const messages = {
  error: {
    email_required: 'El correo es requerido',
    email_invalid: 'El correo no es valido',
    email_exists: 'El correo ya existe',
    password_required: 'La contraseña es requerida',
    password_invalid: 'La contraseña debe tener al menos 8 caracteres',
    user_already_exists: 'El usuario ya existe',
    error: 'Ocurrio un error',
    user_not_found: 'El usuario no existe',
    incorrect_password: 'La contraseña es incorrecta',
    token_required: 'El token es requerido'
  },
  success: {
    user_created: 'El usuario ha sido creado',
    user_logged: 'El usuario ha iniciado sesion',
    mail_sent: 'El correo fue enviado',
    password_changed: 'La contraseña fue cambiada'
  }
}

export default messages
