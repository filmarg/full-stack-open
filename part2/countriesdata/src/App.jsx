import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ query, onChange}) =>
  <div>Find countries: <input value={query} onChange={onChange} /></div>

const CountryItem = ({ country, onClick }) => {
  return (
    <div>
      {country}
      <button onClick={onClick}>Show</button><br />
    </div>
  )
}

const CountryInfo = ({ country }) => {
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

const CountryList = ({ countries, onClick }) => {
  if (!countries.length) {
    return null
  } else if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  } else if (countries.length > 1) {
    return (
      <div>
        {countries.map(c =>
          <CountryItem key={c.name.common}
                       country={c.name.common} onClick={onClick(c)}/>
        )}
      </div>
    )
  }
}

const App = () => {
  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState(null)
  const [selected, setSelected] = useState(null)
  const [countriesShown, setCountriesShown] = useState([])

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => setCountries(response.data))
      .catch(error => console.log(error.message))
  }, [])
  
  const handleChange = (e) => {
    const newQuery = e.target.value
    const newCountriesShown = newQuery ? countries.filter(c =>
      c.name.common.toLowerCase().includes(newQuery.toLowerCase())) : []

    setQuery(newQuery)
    setCountriesShown(newCountriesShown)
    setSelected(newCountriesShown.length === 1 ? newCountriesShown[0] : null)
  }
  
  const handleClick = (country) =>
    () => setSelected(country)

  if (!countries) return null
  
  return (
    <>
      <Filter value={query} onChange={handleChange} />
      <CountryList countries={countriesShown} onClick={handleClick} />
      {selected && <CountryInfo country={selected} />}
    </>
  )
}

export default App
