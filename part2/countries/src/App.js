import './App.css'
import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then(response => {
      setCountries(response.data)
    })
  }, [])

  const [filter, setFilter] = useState('')
  const [countries1, setCountries1] = useState([])
  useEffect(() => {
    let objectCountries = []
    countries.forEach(country => {
      if (
        country.name.common.toLowerCase().indexOf(filter.toLowerCase()) !== -1
      ) {
        objectCountries.push(country)
      }
    })
    setCountries1(objectCountries)
  }, [countries, filter])

  const [str, setStr] = useState()
  useEffect(() => {
    if (countries1.length > 10) {
      setStr(<div>Too many matches, specify another filter</div>)
    } else if (countries1.length <= 10 && countries1.length > 1) {
      setStr(
        countries1.map((country, index) => {
          return (
            <div key={index}>
              {country.name.common}
              <button
                onClick={() => {
                  handleClick(country.name.common)
                }}
              >
                show
              </button>
            </div>
          )
        })
      )
    } else if (countries1.length === 1) {
      setStr(
        countries1.map((country, index) => {
          let keys = []
          let languages = []
          for (let key in country.languages) {
            keys.push(key)
            languages.push(country.languages[key])
          }
          return (
            <div key={index}>
              <h2>{country.name.common}</h2>
              <div>capital {country.capital}</div>
              <div>population {country.population}</div>
              <h3>languages</h3>
              <ul>
                {languages.map((language, index1) => {
                  return <li key={keys[index1]}>{language}</li>
                })}
              </ul>
              <img src={country.flags.png} alt='flag' />
            </div>
          )
        })
      )
    }
  }, [countries1])

  const handleClick = props => {
    setFilter(props)
  }

  const handleChange = event => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <div>
        find countries
        <input value={filter} onChange={handleChange} />
      </div>
      <div>
        {filter === '' ? (
          <div>Too many matches, specify another filter</div>
        ) : (
          str
        )}
      </div>
    </div>
  )
}

export default App
