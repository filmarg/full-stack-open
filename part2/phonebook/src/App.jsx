import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ value, onChange }) =>
      <div>filter shown with <input value={value} onChange={onChange} /></div>

const PersonForm = ({ onSubmit, name, number }) => (
  <form onSubmit={onSubmit}>
    <div>name: <input value={name.value} onChange={name.onChange} /></div>
    <div>number: <input value={number.value} onChange={number.onChange} /></div>
    <div><button type="submit">add</button></div>
  </form>
)

const Person = ({ person }) => <li>{person.name} {person.number}</li>

const Persons = ({ persons }) => (
  <ul>
    {persons.map(person => <Person key={person.id} person={person} />)}
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
    axios
      .get('http://localhost:3001/persons')
      .then(response => setPersons(response.data))
  }, [])
  
  const handleNoteSubmit = (e) => {
    e.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }
    
    if (persons.some(person => JSON.stringify(person) === JSON.stringify({...newPerson, id: person.id}))) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }
  }
  
  const handleChange = (setter) =>
        (e) => setter(e.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={query} onChange={handleChange(setQuery)} />
      <h3>Add a new one</h3>
      <PersonForm onSubmit={handleNoteSubmit}
                  name={{value: newName, onChange: handleChange(setNewName)}}
                  number={{value: newNumber, onChange: handleChange(setNewNumber)}} />
      <h3>Numbers</h3>
      <Persons persons={personsShown} />
    </div>
  )
}

export default App
