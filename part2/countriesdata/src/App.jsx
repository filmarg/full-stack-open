import { useState, useEffect } from 'react'
import { CountryList, CountryInfo } from './components/Country'
import countryService from './services/countries'
import weatherService from './services/weather'

const Filter = ({ query, onChange}) =>
  <div>Find countries: <input value={query} onChange={onChange} /></div>

const App = () => {
  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState(null)
  const [selected, setSelected] = useState(null)
  const [countriesShown, setCountriesShown] = useState([])
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    countryService
      .getAll()
      .then(c => setCountries(c))
      .catch(error => console.log(error.message))
  }, [])

  useEffect(() => {
    if (selected) {
      weatherService
        .getWeather(selected.capital[0])
        .then(w => setWeather(w))
        .catch(error => console.log(error.message))
    }
  }, [selected])
  
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
      {selected && <CountryInfo country={selected} weather={weather} />}
    </>
  )
}

export default App
