import { useState } from 'react'

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
    {persons.map(person => <Person key={person.name+person.number} person={person} />)}
  </ul>
)

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456'},
    { name: 'Ada Lovelace', number: '39-44-5323523'},
    { name: 'Dan Abramov', number: '12-43-234345'},
    { name: 'Mary Poppendieck', number: '39-23-6423122'},
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [query, setQuery] = useState('')
  const personsShown = persons.filter(person =>
    person.name.toLowerCase().includes(query.toLowerCase()))

  const handleNoteSubmit = (e) => {
    e.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber,
    }
    
    if (persons.some(person => JSON.stringify(person) === JSON.stringify(newPerson))) {
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
