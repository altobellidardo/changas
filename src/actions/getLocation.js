import axios from 'axios'

export default async function getLocation (location) {
  const options = {
    method: 'GET',
    url: 'https://trueway-geocoding.p.rapidapi.com/Geocode',
    params: {
      address: location,
      language: 'en'
    },
    headers: {
      'X-RapidAPI-Key': 'fc1569936dmsh70293b045ce5a18p15778ejsnd98211715ad4',
      'X-RapidAPI-Host': 'trueway-geocoding.p.rapidapi.com'
    }
  }

  try {
    const response = await axios.request(options)
    console.log(response.data.results[0].location)
  } catch (error) {
    console.error(error)
  }
}
