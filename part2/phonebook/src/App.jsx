import { useState, useEffect } from 'react'
import personService from './services/persons'

const Notification = ({ message, type }) => {
  if (message === null)
    return null

  return (
    <div className={type}>
      {message}
    </div>
  )
}

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
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('')

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
    
    // Exercise 2.7 says, "Keep in mind how object equality works in
    // Javascript," so I guess I don't *have* to actually use
    // 'JSON.stringify' as I did before:
    //
    //     if (persons.some(person => JSON.stringify({...person, id: undefined}) === JSON.stringify(newPerson)))
    //
    // I guess it's just about names and I don't have to check for
    // entries with the same number but different names.  It's
    // confusing, I'm not sure what's expected.  Maybe I'm being too
    // precise, though.  I'll just leave it as it is because it's
    // better.
    
    const person = persons.find(p => p.name === newPerson.name)
    
    if (person) {
      if (person.number === newPerson.number) {
        alert(`${newName} is already added to phonebook`)
      } else if (confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(person.id, {...person, number: newPerson.number})
          .then(returned => {
            setPersons(persons.map(p => p.id !== returned.id ? p : returned))
            setNewName('')
            setNewNumber('')
            displayNotification('confirmation', `Updated ${returned.name}`, 5000)
          })
          .catch(error => {
            setPersons(persons.filter(p => p.id !== person.id))
            displayNotification('error', `Information of ${person.name} has already been removed from server`, 8000)
          })
      }
    } else {
      personService
        .add(newPerson)
        .then(p => {
          setPersons(persons.concat(p))
          setNewName('')
          setNewNumber('')
          displayNotification('confirmation', `Added ${p.name}`, 5000)
        })
    }
  }

  const handlePersonDelete = (person) => (
    () => {
      if (confirm(`Delete "${person.name}"?`)) {
        personService
          .remove(person.id)
          .then(removed => {
            setPersons(persons.filter(p => p.id !== removed.id))
            displayNotification('confirmation', `Deleted ${removed.name}`, 5000)
          })
      }
    }
  )

  const handleChange = (setter) =>
        (e) => setter(e.target.value)

  const displayNotification = (type, message, delay) => {
    setMessageType(type)
    setMessage(message)
    setTimeout(() => setMessage(null), delay)
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={messageType} />
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
