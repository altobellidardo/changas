export function get18YearsAgo () {
  const today = new Date()
  const minBirth = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate())
  const [minBirthdate] = minBirth.toISOString().split('T')
  return minBirthdate
}
