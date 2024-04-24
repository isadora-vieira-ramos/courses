import { useState } from 'react'

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

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone:'', id: 1}
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newSearch, setNewSearch] = useState('')

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
      <h2>Numbers</h2>
      <div>
        {filteredPhone.map(person => 
          <p key={person.name}>{person.name} - {person.phone}</p>
        )}
      </div>
    </div>
  )
}

export default App