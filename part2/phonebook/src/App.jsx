import { useState, useEffect } from 'react'
import personService from './services/persons'

const Filter = ({ value, onChange }) =>
      <div>filter shown with <input value={value} onChange={onChange} /></div>

const PersonForm = ({ onSubmit, name, number }) => (
  <form onSubmit={onSubmit}>
    <div>name: <input value={name.value} onChange={name.onChange} /></div>
    <div>number: <input value={number.value} onChange={number.onChange} /></div>
    <div><button type="submit">add</button></div>
  </form>
)

const Person = ({ person, onClick }) => (
  <>
    <li>
      {person.name} {person.number}
      <button onClick={onClick}>Delete</button>
    </li>
  </>
)

const Persons = ({ persons, onClick }) => (
  <ul>
    {persons.map(person => <Person key={person.id}
                                   person={person} onClick={onClick(person)} />)}
  </ul>
)

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [query, setQuery] = useState('')
  const personsShown = persons.filter(person =>
    person.name.toLowerCase().includes(query.toLowerCase()))

  useEffect(() => {
    personService
      .getAll()
      .then(allPersons => setPersons(allPersons))
  }, [])
  
  const handlePersonSubmit = (e) => {
    e.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber,
    }
    
    if (persons.some(person => JSON.stringify({...person, id: undefined}) === JSON.stringify(newPerson))) {
      alert(`${newName} is already added to phonebook`)
    } else {
      personService
        .add(newPerson)
        .then(p => {
          setPersons(persons.concat(p))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const handlePersonDelete = (person) => (
    () => {
      if (confirm(`Delete "${person.name}"?`)) {
        personService
          .remove(person.id)
          .then(removed =>
            setPersons(persons.filter(p => p.id !== removed.id)))
      }
    }
  )

  const handleChange = (setter) =>
        (e) => setter(e.target.value)
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={query} onChange={handleChange(setQuery)} />
      <h3>Add a new one</h3>
      <PersonForm onSubmit={handlePersonSubmit}
                  name={{value: newName, onChange: handleChange(setNewName)}}
                  number={{value: newNumber, onChange: handleChange(setNewNumber)}} />
      <h3>Numbers</h3>
      <Persons persons={personsShown} onClick={handlePersonDelete} />
    </div>
  )
}

export default App
