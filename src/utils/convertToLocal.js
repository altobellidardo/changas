const convertToLocal = (date) => {
  const utc = new Date(date)
  const offset = -utc.getTimezoneOffset() * 60000
  const local = new Date(utc.getTime() + offset)
  return local
}

export default convertToLocal
