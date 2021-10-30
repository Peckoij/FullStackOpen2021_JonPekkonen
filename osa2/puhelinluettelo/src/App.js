import React, { useState, useEffect } from 'react'
//import axios from 'axios'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  //lomakkeen kenttien hallinta
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const notiObject = {
    errorMessage, 
    setErrorMessage, 
    successMessage, 
    setSuccessMessage
  }


  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])




  const addPerson = (event) => {
    event.preventDefault()
    console.log('"add" button clicked', event.target)
    const personObject = {
      name: newName,
      number: newNumber
    }
    console.log("Submitted person:", personObject);
    // find if there already is person eith given name, if so personIndex is that persons index in persons array, otherwise personIndex is -1
    const personIndex = persons.findIndex(person => person.name === personObject.name)
    if (personIndex >= 0) {
      console.log("Updating number, old data:", persons[personIndex])
      console.log("Updating number, new data:", personObject)
      // if person exist ask if user wants to update number
      if (window.confirm(`${persons[personIndex].name} is already added to phonebook, replace old number with a new one`)) {
        console.log(`Confirmed, update ${persons[personIndex].name}`);
        // temporary array to remove old data from local array, 
        // after promise fullfills, concat this with result (updated number) and then setPersons  with updated array
        const tempPersons = persons.filter(person => person.id !== persons[personIndex].id)
        personService
          .update(persons[personIndex].id, personObject)
          .then(result => {
            console.log("Update result: ", result);
            setPersons(tempPersons.concat(result))
            setNewName('')
            setNewNumber('')
            setSuccessMessage(
              `${result.name} number updated`
            )
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
          })
          .catch(error => {
            console.log('Something went wrong in updating person', error)
            setErrorMessage(
              `Something went wrong in updating persons information, please refresh page`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      }
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          console.log(returnedPerson);
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setSuccessMessage(
            `${returnedPerson.name} added`
          )
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
      //setPersons(persons.concat(personObject))
    }

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
    setNewFilter(event.target.value)
  }
  // makes it easier when passing handlers to PersonForm component
  const handlerObject = {
    addPerson,
    newName,
    handleNameChange,
    newNumber,
    handleNumberChange
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <ErrorNotification message={errorMessage} />
      <Notification message={successMessage} />
      <Filter nh={newFilter} fh={handleFilterChange} />

      <h2>Add new</h2>
      <PersonForm {...handlerObject} />
      <h2>Numbers</h2>
      <Phonebook persons={persons} filter={newFilter} setPersons={setPersons} nO={notiObject}/>
    </div>
  )
}


const PersonForm = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange }) => {
  return (
    <form onSubmit={addPerson}>
      <div>name: <input value={newName} onChange={handleNameChange} /></div>
      <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Filter = ({ nf, fh }) => {
  return <div>filter shown with: <input value={nf} onChange={fh} /></div>
}

const Phonebook = ({ persons, filter, setPersons, nO }) => {
  filter = filter.toLowerCase()
  console.log("Phonebook all names", persons);
  // If there is filter characters
  if (filter.length > 0) {
    return (
      persons.map(person => {
        // Check persons array if there is any matches for given string in names
        const name = person.name.toLowerCase()
        if (name.includes(filter)) {
          console.log(person);
          const personDataObject = {
            ...person,
            persons,
            setPersons,
            nO
          }
          return <Person key={person.id} {...personDataObject} />
        }
        return ("")
      })
    )
  }
  // Without filter show all names
  return (
    persons.map(person => {
      const personDataObject = {
        ...person,
        persons,
        setPersons,
        nO
      }
      return <Person key={person.id} {...personDataObject} />
    })
  )
}

const Person = ({ name, number, id, persons, setPersons, nO }) => {
  return (
    <div>
      {name} {number}
      <button onClick={() => { console.log(`Clicked delete ${name} with id: ${id}`); deletePerson(name, id, persons, setPersons, nO) }}>delete</button>
    </div>

  )
}


const deletePerson = (name, id, persons, setPersons, nO) => {
  console.log("deletePerson persons list", persons);
  if (window.confirm(`Delete ${name}`)) {
    console.log(`Confirmed, delete ${name}`);
    personService
      .remove(id)
      .then(result => {
        console.log("Delete result: ", result);
        setPersons(persons.filter(person => person.id !== id))
        nO.setSuccessMessage(
          `${name} removed from phonebook`
        )
        setTimeout(() => {
          nO.setSuccessMessage(null)
        }, 5000)
      })
      .catch(error => {
        console.log('Something went wrong in removing person', error)
        nO.setErrorMessage(
          `Error in removing ${name}, person may already be removed, please reload page `
        )
        setTimeout(() => {
          nO.setErrorMessage(null)
        }, 5000)
      })
  }
}

const ErrorNotification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="error">
      {message}
    </div>
  )
}
const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="notification">
      {message}
    </div>
  )
}

export default App