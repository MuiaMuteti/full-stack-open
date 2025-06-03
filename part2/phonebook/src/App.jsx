import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification,  setNotification] = useState(null)

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        console.log(initialPersons)
        setPersons(initialPersons)
    })
  }, [])

  console.log('rendering', persons.length, 'contacts')

  const addPerson = (event) => {
    event.preventDefault()

    const existingPerson = persons.find(pers => pers.name === newName)

    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const personObj = {
          name: newName,
          number: newNumber
        }
        personService.replace(existingPerson.id, personObj).then(returnedPerson => {
          console.log(returnedPerson)
          setPersons(
            persons.map(pers => pers.id === returnedPerson.id? returnedPerson : pers))
            setNewName('')
            setNewNumber('')
            setNotification({
              message: `${returnedPerson.name}'s number updated`,
              type: 'success'
            })
            setTimeout(() => {
              setNotification(null)
            }, 5000)
        }).catch(error => {
          if (error.response?.status === 404) {
            setPersons(persons.filter(pers => pers.id !== existingPerson.id))
            setNotification({
              message: `Information of ${personObj.name} has already been removed from server`,
              type: 'error'
            })
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          } else {
            setNotification({
              message: error.response?.data?.error || error.message,
              type: 'error'
            })
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          }
        })
      }
    } else {
      const personObj = {
        name: newName,
        number: newNumber
      }
  
      personService
        .create(personObj)
        .then(returnedPerson => {
          console.log(returnedPerson)
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setNotification({
            message: `Added ${returnedPerson.name}`,
            type: 'success'
          })
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        }).catch(error => {
          console.log('error:', error)
          setNotification({
            message: error.response?.data?.error || `${[error.message]}: Failed to add contact`,
            type: 'error'
          })
          setTimeout(() => {
          setNotification(null)
        }, 5000)
        })
    }    
  }

  const handleNameChange = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    // console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    // console.log(event.target.value)
    setFilter(event.target.value)
  }

  const handleRemove = id => {
    const person = persons.find(pers => pers.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.remove(id).then(response => {
        // console.log(response, 'deleted')
        setPersons(persons.filter(pers => pers.id !== id))
        setNotification({
          message: `${person.name} was deleted`,
          type: 'success'
        })
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
    }
  }

  const filteredContacts = filter? persons.filter(pers => pers.name.toLowerCase().includes(filter.toLowerCase())) : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter 
        filter={filter} 
        handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm 
        addPerson={addPerson} 
        newName={newName}
        handleNameChange={handleNameChange} 
        newNumber={newNumber}         
        handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons
        contacts={filteredContacts}
        handleRemove={handleRemove} />
    </div>
  )
}

export default App