import { useState, useEffect } from 'react'
import axios from 'axios'
import phonebookService from './services/phonebook'

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
  const {person, deletePhone} = props;
  return (
    <>
      <p key={person.id}>{person.name} - {person.number} <button onClick={deletePhone}>Delete</button></p>
    </>
  );
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newSearch, setNewSearch] = useState('')

  useEffect(() => {
    phonebookService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])


  const addName = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName, 
      number: newPhone,
      id: persons.length + 1
    };
    const userExists = persons.filter(person => person.name === newName);
    if(userExists.length === 0){
      phonebookService
        .create(newPerson)
        .then(returnedPerson =>{
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewPhone('')
        })
    }else{
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const updatedUser = {...userExists[0], number:newPhone}
        phonebookService
          .update(updatedUser.id, updatedUser)
          .then(response=>{
            phonebookService.getAll().then(responseGet =>{
              setPersons(responseGet)
            })
            window.alert("Phone changed!")
          })
      }
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }

  const deletePhone = (id) =>{
    if(window.confirm("Are you sure you want to delete?")){
      phonebookService
        .remove(id)
        .then(response =>{
          phonebookService.getAll().then(responseGet =>{
            setPersons(responseGet)
          })
        })
    }
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
          <Person key={person.id} person={person} deletePhone={()=> deletePhone(person.id)}></Person>
        )}
      </div>
    </div>
  )
}

export default App