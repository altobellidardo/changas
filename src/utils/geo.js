import geo from '@/data/geo.json'

export function loadProvinces () {
  // Return the Provinces which match the country
  const countryJSON = geo.find(country => country.country === 'Argentina')
  const fullProvinces = countryJSON.states
  const provinces = fullProvinces.map(province => province.name)
  return provinces
}

export function loadCities (inputProvince) {
  // Return the cities which match the country and province
  const countryJSON = geo.find(country => country.country === 'Argentina')
  const provinceCode = countryJSON.states.find(province => province.name === inputProvince).code
  const fullCities = countryJSON.cities.filter(city => city.code === provinceCode)
  const cities = fullCities.map(city => city.name)

  return cities
}

export function formatLocation (inputLocation) {
  // Split the input date string into year, month, and day parts
  const [inputCity, inputProvince, inputCountry] = inputLocation.split(', ')
  const provinceMap = shortNames.find(country => country.country === inputCountry).states

  let shortProvince
  if (inputProvince !== 'Cdad. Autónoma de Buenos Aires') {
    shortProvince = provinceMap.find(province => province.name === inputProvince).code
  } else {
    shortProvince = provinceMap.find(province => province.name === 'Ciudad Autónoma de Buenos Aires').code
  }

  return `${inputCity}, ${shortProvince}`
}
