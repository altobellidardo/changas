function formatDate (inputDate) {
  // Split the input date string into year, month, and day parts
  const [year, month, day] = inputDate.split('-')

  // Create a new Date object with the parsed year, month, and day
  const date = new Date(year, month - 1, day) // Note: month is 0-indexed in JavaScript Date objects

  // Get the day, month, and year from the Date object
  const formattedDay = date.getDate().toString().padStart(2, '0')
  const formattedMonth = (date.getMonth() + 1).toString().padStart(2, '0') // Adding 1 to month since it's 0-indexed
  const formattedYear = date.getFullYear().toString()

  // Concatenate the formatted parts into 'dd/mm/yyyy' format
  const formattedDate = `${formattedDay}/${formattedMonth}/${formattedYear}`

  return formattedDate
}

export default formatDate
