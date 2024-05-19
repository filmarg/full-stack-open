import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ query, onChange}) =>
  <div>Find countries: <input value={query} onChange={onChange} /></div>

const Country = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      Official name: {country.name.official}<br />
      Capital{country.capital.length > 1 && 's'}: {country.capital.join('; ')}<br />
      Area: {country.area}
      <h3>Languages:</h3>
      <ul>
        {Object.entries(country.languages).map(l =>
          <li key={l[0]}>{l[1]}</li>
        )}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} width="200" />
    </div>
  )
}

const Countries = ({ countries }) => {
  if (!countries.length) {
    return null
  } else if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  } else if (countries.length > 1) {
    return (
      <div>
        {countries.map(c =>
          <div key={c.name.common}>
            {c.name.common}<br />
          </div>
        )}
      </div>
    )
  } else {
    return (
      <Country country={countries[0]} />
    )
  }
}

const App = () => {
  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState(null)
  const countriesShown = query ? countries.filter(c =>
    c.name.common.toLowerCase().includes(query.toLowerCase())) : []

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => setCountries(response.data))
      .catch(error => console.log(error.message))
  }, [])
  
  const handleChange = (e) => setQuery(e.target.value)
  
  if (!countries) return null
  
  return (
    <>
      <Filter value={query} onChange={handleChange} />
      <Countries countries={countriesShown} />
    </>
  )
}

export default App
