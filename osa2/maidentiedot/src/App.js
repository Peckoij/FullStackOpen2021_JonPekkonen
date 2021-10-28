import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const [forecast, setNewForecast] = useState({})

  const hookCountries = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }
  useEffect(hookCountries, [])





  //console.log("Sää palvelu api key",process.env.REACT_APP_WEATHER_API_KEY)

  const handleFilterChange = (event) => {
    const filter = event.target.value.toLowerCase()
    setNewFilter(filter)
    console.log("Cuttent Filter:", filter);
    setFilteredCountries(countries.filter(country => country.name.common.toLowerCase().includes(filter)))
    console.log("filtered countries", filteredCountries);

  }

  const handleNameClick = (name) => {
    console.log("handleNameClick input:", name);
    setNewFilter(name.toLowerCase())
    setFilteredCountries(countries.filter(country => country.name.common.toLowerCase().includes(name)))
  }


  return (
    <div>
      <h2>Country search</h2>
      <Filter nh={newFilter} fh={handleFilterChange} />
      <CountryList countries={filteredCountries} filter={newFilter} hNC={handleNameClick} setForecast={setNewForecast} forecast={forecast} />
    </div>
  )
  /* Old form, incase new separate component breaks and burns
  <form onSubmit={addcountry}>
        <div>name: <input value={newName} onChange={handleNameChange} /></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  */
}

const Filter = ({ nf, fh }) => {
  return <div>filter countries with: <input value={nf} onChange={fh} /></div>
}

const CountryList = ({ countries, filter, hNC, setForecast, forecast }) => {

  console.log("Countrylist filtered countries", countries);
  // If there is filter characters
  if (filter.length > 0) {
    if (countries.length > 10) return (<div>Too many matches, be more specific</div>)
    // 2-10 countries in filtered list
    if (countries.length <= 10 && countries.length > 1) {
      return (countries.map(country => <Country key={country.ccn3} country={country} hNC={hNC} />))
    }
    // 0 countries in list'
    if (countries.length === 0) return (<div>No matches for your search</div>)
    // exactly 1 county in list
    if (countries.length === 1) {
      return (<OneCountry key={countries[0].ccn3} country={countries[0]} setForecast={setForecast} forecast={forecast} />)
    }


    return <div>Something went wrong, please try again.</div>

    /*
    return (
      countries.map(country => {
        // Check countries array if there is any matches for given string in names
        const name = country.name.common.toLowerCase()
        if (name.includes(filter)) {
          return <Country key={country.ccn3} country={country} />
        }
        return ("")
      })
    )*/

  }
  // Without filter, ask for one
  return <div>Please provide filter for country name</div>
}

const Country = ({ country, hNC }) => {
  //console.log(setNewFilter);
  const nameLC = country.name.common.toLowerCase()
  // console.log(nameLC);
  return (
    <div>{country.name.common} <button onClick={() => { console.log("Clicked ", nameLC); hNC(nameLC) }}>show</button></div>
  )
}

const OneCountry = ({ country, setForecast, forecast }) => {
  console.log("The one and only country: ", country);
  const langs = Object.values(country.languages)
  console.log("Languages used in country", langs)

  const getWeather = () => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHER_API_KEY}&query=${country.capital[0]}`)
      .then(response => {
        console.log('promise fulfilled')
        console.log(response.data)
        setForecast(response.data)
      })
  }
  useEffect(getWeather, [country.capital, setForecast])

  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>capital {country.capital[0]}</div>
      <div>population {country.population}</div>
      <h3>languages</h3>
      <ul>
        {langs.map(lang => <LanguageLine lang={lang} />)}
      </ul>
      <div><img src={country.flags.png} alt="Flag of found country" /></div>
      <Forecast forecast={forecast} />
    </div>
  )
}



const Forecast = ({ forecast }) => {
  console.log(forecast);
  if (forecast.current) {
    return <div>
      <h3>Weather in {forecast.location.name}</h3>
      <div><strong>temperature: </strong>{forecast.current.temperature}</div>
      <div><img src={forecast.current.weather_icons[0]} alt="weather icon" /></div>
      <div><strong>wind:</strong> {forecast.current.wind_speed} direction {forecast.current.wind_dir}</div>
    </div>
  }
  else return 'No forecast available'


}

//useEffect(hookWeather(), [])
/*
http://api.weatherstack.com/current
    ? access_key = YOUR_ACCESS_KEY
    & query = New York
*/

const LanguageLine = ({ lang }) => {
  // console.log(lang);
  return <li>{lang}</li>
}
export default App