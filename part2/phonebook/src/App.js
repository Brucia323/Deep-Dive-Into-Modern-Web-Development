import './App.css';
import { useState } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '040-1234567',
      id: 1
    },
    {
      name: 'Ada Lovelace',
      number: '39-44-5323523',
      id: 2
    },
    {
      name: 'Dan Abramov',
      number: '12-43-234345',
      id: 3
    },
    {
      name: 'Mary Poppendieck',
      number: '39-23-6423122',
      id: 4
    }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const areTheseObjectsEqual = (first, second) => {
    if (first === null || first === undefined || second === null || second === undefined) {
      return first === second
    }
    if (first.constructor !== second.constructor) {
      return false
    }
    if (first instanceof Function || first instanceof RegExp) {
      return first === second
    }
    if (first === second || first.valueOf() === second.valueOf()) {
      return true
    }
    if (first instanceof Date) {
      return false
    }
    if (Array.isArray(first) && first.length !== second.length) {
      return false
    }
    if (!(first instanceof Object) || !(second instanceof Object)) {
      return false
    }
    const firstKeys = Object.keys(first)
    const allKeysExist = Object.keys(second).every(i => firstKeys.indexOf(i) !== -1)
    const allKeyValueMatch = firstKeys.every(i => areTheseObjectsEqual(first[i], second[i]))
    return allKeysExist && allKeyValueMatch
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const objectPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    let flag = true
    persons.forEach((person) => {
      if (areTheseObjectsEqual(person.name, objectPerson.name)) {
        flag = false
      }
    })
    if (flag) {
      setPersons(persons.concat(objectPerson))
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm onSubmit={handleSubmit} nameValue={newName} onChangeName={handleNameChange} numberValue={newNumber} onChangeNumber={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} />
    </div>
  )
}

export default App;
