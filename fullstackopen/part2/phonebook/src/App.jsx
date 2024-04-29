import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = (props) => {
  const {newSearch, handleSearchChange} = props;
  return (
    <>
      <input value={newSearch} 
        onChange={handleSearchChange} 
        placeholder='Pesquise na lista'></input>
    </>
  );
}

const PersonForm = (props) => {
  const {addName, newName, newPhone, handleNameChange, handlePhoneChange} = props;
  return (
    <form onSubmit={addName}>
        <div>
          Name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          Number: <input value={newPhone} onChange={handlePhoneChange} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
  );
}

const Person = (props) => {
  const {person} = props;
  return (
    <>
      <p key={person.id}>{person.name} - {person.number}</p>
    </>
  );
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newSearch, setNewSearch] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])


  const addName = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName, 
      phone: newPhone,
      id: persons.length + 1
    };
    const exists = persons.filter(person => person.name === newName);
    console.log(exists.length)
    if(exists.length === 0){
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewPhone('')
    }else{
      alert(`${newName} is already added to phonebook`)
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    console.log(event.target.value)
    setNewPhone(event.target.value)
  }

  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setNewSearch(event.target.value)
    console.log(filteredPhone)
  }

  const filteredPhone = 
    newSearch.length >= 1? 
    persons.filter(x => x.name.toLowerCase().includes(newSearch.toLowerCase())) :
    persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleSearchChange={handleSearchChange} value={newSearch}></Filter>
      <PersonForm addName={addName}
                  newName={newName}
                  newPhone={newPhone}
                  handleNameChange={handleNameChange}
                  handlePhoneChange={handlePhoneChange}></PersonForm>     
      <h2>Numbers</h2>
      <div>
        {filteredPhone.map(person => 
          <Person key={person.id} person={person}></Person>
        )}
      </div>
    </div>
  )
}

export default App