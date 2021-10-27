import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' },
    { name: 'Poppy Maryindieck', number: '49-29-1359122' }
  ])
  //lomakkeen kenttien hallinta
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    console.log('"add" button clicked', event.target)
    const personObject = {
      name: newName,
      number: newNumber
    }
    console.log("Submitted person:", personObject);
    if (persons.some(person => person.name === personObject.name)) {
      // started to worry about updating persons phone number if it differs from one saved, maybe later
      //  if(personObject.number.length>0 && personObject.number != person.number ){ }  
      alert(`${personObject.name} is already added to phonebook!`)
    } else {
      setPersons(persons.concat(personObject))
      setNewName('')
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
  const handlerObject = {
    ap: addPerson, nName: newName, hNameC: handleNameChange, nNum: newNumber, hNumC: handleNumberChange
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter nh={newFilter} fh={handleFilterChange} />

      <h2>Add new</h2>
      <PersonForm {...handlerObject} />
      <h2>Numbers</h2>
      <Phonebook persons={persons} filter={newFilter} />
    </div>
  )
  /* Old form, incase new separate component breaks and burns
  <form onSubmit={addPerson}>
        <div>name: <input value={newName} onChange={handleNameChange} /></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  */
}
const PersonForm = ({ aP, nName, hNameC, nNum, hNumC }) => {
  return (
    <form onSubmit={aP}>
      <div>name: <input value={nName} onChange={hNameC} /></div>
      <div>number: <input value={nNum} onChange={hNumC} /></div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Filter = ({ nf, fh }) => {
  return <div>filter shown with: <input value={nf} onChange={fh} /></div>
}

const Phonebook = ({ persons, filter }) => {
  filter = filter.toLowerCase()
  console.log("Phonebook all names", persons);
  // If there is filter characters
  if (filter.length > 0) {
    return (
      persons.map(person => {
        // Check persons array if there is any matches for given string in names
        const name = person.name.toLowerCase()
        if (name.includes(filter)) {
          return <Person key={person.name} {...person} />
        }
        return ("")
      })
    )
  }
  // Without filter show all names
  return (
    persons.map(person => <Person key={person.name} {...person} />)
  )
}

const Person = ({ name, number }) => {
  return (
    <div>{name} {number}</div>
  )
}

export default App