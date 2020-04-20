import React, { useState, useEffect } from 'react'

import phonebookService from './services/phonebook'
import Filter from "./components/Filter"
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ notif, setNotif ] = useState(null)
  const [ success, setSuccess ] = useState(null)

  useEffect(() => {
    phonebookService.getAll()
      .then(response => setPersons(response))
  }, []);

  // Create a copy of the persons array that can be filtered if a search term is inputted
  let new_persons = [...persons]

  if (filter) {
    new_persons = new_persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())) 
  }

  const handleFilterChange = (e) => setFilter(e.target.value)

  const handleNameChange = (e) => setNewName(e.target.value)

  const handleNumberChange = (e) => setNewNumber(e.target.value)

  const handleFormSubmit = (event) => {
    event.preventDefault()

    const duplicate = persons.filter(person => person.name === newName)

    //console.log("DUP:", duplicate)
    if (duplicate.length) {
      const choice = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)

      if (choice === true) {
        let updatePerson = duplicate[0]
        updatePerson.number = newNumber
        phonebookService.update(updatePerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== updatePerson.id ? person:  returnedPerson))

            setNotif(`Updated ${returnedPerson.name}`)
            setSuccess(true)
  
            setTimeout(() => {
              setNotif(null)
              setSuccess(null)
            }, 5000)
          })
      }
    }

    else {
      const newPerson = { 
        name: newName, 
        number: newNumber 
      }

      phonebookService.create(newPerson)
        .then(response => {
          setPersons(persons.concat(response))
          console.log("Added: ", response)
          setNotif(`Added ${response.name}`)
          setSuccess(true)

          setTimeout(() => {
            setNotif(null)
            setSuccess(null)
          }, 5000)
        })

      setNewName("")
      setNewNumber("")
    }
  }

  const handleDelete = (person) => {
   const result = window.confirm(`Delete ${person.name}`)

    if (result === true) {
      phonebookService.remove(person.id)
        .then(response => console.log("DELETED", person))
        .catch(error => {
          setNotif(`Information of ${person.name} has already been removed from the server`)
          setSuccess(false)

          setTimeout(() => {
            setNotif(null)
            setSuccess(null)
          }, 5000)
        })

      const updatedPersons = persons.filter(p => p.id !== person.id)
      setPersons(updatedPersons)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notif} success={success}/>

      <Filter filter={filter} handleChange={handleFilterChange} />

      <h2>add a new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleFormSubmit={handleFormSubmit}
      />

      <h2>Numbers</h2>
      <Persons persons={new_persons} handleDelete={handleDelete}/>
    </div>
  )
}

export default App