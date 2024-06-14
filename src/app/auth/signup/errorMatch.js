import messages from '@/utils/messages'

const errorMatch = [
  [['name', 'surname'], messages.error.name_required],
  [['city', 'province', 'country'], messages.error.location_required],
  [['email'], messages.error.email_required],
  [['password'], messages.error.password_required],
  [['birthdate'], messages.error.birth_required],
  [['dni'], messages.error.dni_invalid]
]

export default errorMatch
