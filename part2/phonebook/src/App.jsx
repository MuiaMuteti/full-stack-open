import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios.get('http://localhost:3001/persons').then(response => {
      console.log('promise fulfilled', response.data)
      setPersons(response.data)
    })
  }, [])

  console.log('rendering', persons.length, 'contacts')

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)

    if (nameExists(newName)) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
      return
    }

    const personObj = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    setPersons(persons.concat(personObj))  
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const nameExists = (name) => {
    return persons.some(pers => pers.name === name)
  }

  const filteredContacts = filter? persons.filter(pers => pers.name.toLowerCase().includes(filter.toLowerCase())) : persons

  return (
    <div>
      <h2>Phonebook</h2>
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
      <Persons contacts={filteredContacts} />
    </div>
  )
}

export default App