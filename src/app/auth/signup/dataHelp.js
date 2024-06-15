import messages from '@/utils/messages'

export const errorMatch = [
  [['name', 'surname'], messages.error.name_required],
  [['city', 'province', 'country'], messages.error.location_required],
  [['email'], messages.error.email_required],
  [['password'], messages.error.password_required],
  [['birthdate'], messages.error.birth_required],
  [['dni'], messages.error.dni_invalid]
]

export function getFields (formData) {
  const fields = ['name', 'surname', 'email', 'password', 'country', 'province', 'city', 'dni', 'birth', 'phone', 'image']
  const data = Object.fromEntries(fields.map(field => [field, formData.get(field)]))

  return data
}
