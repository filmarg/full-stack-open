const CountryItem = ({ country, onClick }) => {
  return (
    <div>
      {country}
      <button onClick={onClick}>Show</button><br />
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

const CityWeather = ({ city, weather }) => {
  return (
    <div>
      <h2>Weather in {city}</h2>
      Temperature: {weather.main.temp} °C<br />
      <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
      {weather.weather[0].description}<br />
      Wind: {weather.wind.speed} m/s
    </div>
  )
}

const CountryInfo = ({ country, weather }) => {
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
      {weather && <CityWeather city={country.capital[0]} weather={weather} />}
    </div>
  )
}

export { CountryList, CountryInfo}
