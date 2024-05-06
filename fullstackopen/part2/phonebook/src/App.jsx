import { useState, useEffect } from 'react'
import phonebookService from './services/phonebook'
import Notification from './components/Notification';
import Filter from './components/Filter';
import Person from './components/Person';
import PersonForm from './components/PersonForm';

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [notification, setNotification] = useState(null)
  const [error, setError] = useState(false)

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
      id: `${persons.length + 1}`
    };
    const userExists = persons.filter(person => person.name === newName);
    if(userExists.length === 0){
      phonebookService
        .create(newPerson)
        .then(returnedPerson =>{
          setNotification(`Added '${newPerson.name}'`)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
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
            setNotification(`Changed '${newPerson.name}'`)
            setTimeout(() => {
              setNotification(null)
            }, 5000)
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
        .catch(error=> {
          setError(true)
          setNotification(`This information has already been deleted, try refresh the page`)
            setTimeout(() => {
              setNotification(null)
              setError(false)
            }, 5000)
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
      <Notification message={notification} error={error}></Notification>
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