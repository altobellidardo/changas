const messages = {
  error: {
    email_required: 'El correo es requerido',
    email_invalid: 'El correo no es valido',
    email_exists: 'El correo ya existe',
    password_required: 'La contraseña es requerida',
    password_invalid: 'La contraseña debe tener al menos 3 caracteres',
    user_already_exists: 'El usuario ya existe',
    error: 'Ocurrio un error',
    user_not_found: 'El usuario no existe',
    incorrect_password: 'La contraseña es incorrecta',
    token_required: 'El token es requerido',
    existing_job: 'Usted ya cargo está experiencia laboral',
    location_not_found: 'Ocurrió un error al intentar encontrar la ubicación',
    fail_subscription: 'La suscripción al canal fallo, los mensajes no se actualizarán',
    name_required: 'El nombre y el apellido es requerido',
    location_required: 'La ubicación es requerida',
    dni_invalid: 'El dni debe tener 8 digitos',
    birth_required: 'La fecha de nacimiento es requerida',
    user_jobs_not_found: 'No se encontraron los trabajos del usuario solicitado',
    pending_contract: 'Usted tiene contratos sin cerrar con el otro usuario, cierrelos antes de crear otro',
    existing_review: 'Usted ya reseñó este trabajo'
  },
  success: {
    user_created: 'El usuario ha sido creado',
    user_logged: 'El usuario ha iniciado sesion',
    mail_sent: 'El correo fue enviado',
    password_changed: 'La contraseña fue cambiada',
    athorized: 'Autorizado',
    proposal_uploaded: 'La propuesta de trabajo fue cargada con éxito',
    job_uploaded: 'La experiencia laboral fue cargada con éxito',
    location_found: 'La ubicación ingresada fue hallada',
    chat_created: 'El chat fue creado con éxito',
    message_sent: 'El mensaje fue enviado con éxito',
    review_uploaded: 'La reseña fue subida satisfactoriamente'
  }
}

export default messages
