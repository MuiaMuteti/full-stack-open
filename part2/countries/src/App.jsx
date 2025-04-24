import { useState, useEffect } from 'react'
import CountryFilter from './components/CountryFilter'
import Countries from './components/Countries'
import getAll from './services/countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [searchString, setSearchString] = useState('')

  useEffect(() => {
    console.log('effect running')
    getAll()
      .then(response => setCountries(response))
      .catch(error => console.log(error))
  }, [])

  const handleSearchStringChange = (event) => {
    const newFilter = event.target.value
    const searchedCountries = newFilter.trim().length === 0? 
      [] : countries.filter(country => 
        country.name.common.toLowerCase().includes(newFilter.trim().toLowerCase()))
    setSearchString(newFilter)
    setFilteredCountries(searchedCountries)
  }

  console.log('rendering')

  if (countries.length === 0) {
    return (
      <p>Fetching data from server</p>
    )
  } else {  
    return (
      <div>
        <CountryFilter 
          searchString={searchString} 
          handleSearchStringChange={handleSearchStringChange} />
        <Countries countries={filteredCountries} />
      </div>
    )
  }
}

export default App
