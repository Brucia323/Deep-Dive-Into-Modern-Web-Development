import './App.css';
import { useState, useEffect } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import phonebookService from './services/phonebook';
import Message from './components/Message';

const App = () => {
  const [persons, setPersons] = useState([])
  useEffect(() => {
    phonebookService
      .getAll()
      .then(initialPhonebook => {
        setPersons(initialPhonebook)
      })
  }, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    let id = -1
    persons.forEach((person) => {
      if (person.name === newName) {
        id = person.id
      }
    })
    if (id === -1) {
      const objectPerson = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      phonebookService
        .create(objectPerson)
        .then(returnPerson => {
          setPersons(persons.concat(returnPerson))
          setSuccessMessage(`Added ${returnPerson.name}`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000);
          setNewName('')
          setNewNumber('')
        })
    } else {
      const objectPerson = {
        name: newName,
        number: newNumber,
        id: id
      }
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        phonebookService
          .update(objectPerson)
          .then(returnPerson => {
            setPersons(persons.map(person => person.id !== objectPerson.id ? person : returnPerson))
          })
          .catch(error => {
            setErrorMessage(`Information of ${objectPerson.name} has already been removed from server`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000);
          })
      }
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleClick = (id, name) => {
    if (window.confirm(`delete ${name}`)) {
      phonebookService
        .deletePerson(id)
        .then((status) => {
          if (status === 200) {
            setPersons(persons.filter(person => person.id !== id))
          }
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Message successMessage={successMessage} errorMessage={errorMessage} />
      <Filter value={filter} onChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm onSubmit={handleSubmit} nameValue={newName} onChangeName={handleNameChange} numberValue={newNumber} onChangeNumber={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} onClick={handleClick} />
    </div>
  )
}

export default App;
