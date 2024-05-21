import axios from 'axios'

const allCountries = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const getAll = () =>
      axios
      .get(allCountries)
      .then(response => response.data)

export default { getAll }
