import axios from 'axios'

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?q='
const apiKey = import.meta.env.VITE_API_KEY

const getWeather = (city) =>
      axios
      .get(`${baseUrl}${city}&units=metric&APPID=${apiKey}`)
      .then(response => response.data)

export default { getWeather }
