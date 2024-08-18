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
    phonebookService.getAllContacts()
      .then(response => {
        setPersons(response)
      })
  }, [])


  const addContact = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName, 
      number: newPhone,
      id: `${persons.length + 1}`
    };
    const filterListByName = persons.filter(person => person.name === newName);
    if(filterListByName.length === 0){
      phonebookService
        .createContact(newPerson)
        .then(returnedPerson =>{
          showNotification(`Added '${newPerson.name}'`)
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewPhone('')
        })
    }else{
      const dialogMessage = `${newName} is already added to phonebook, ` + 
      'replace the old number with a new one?'
      if(dialogWindowResponse(dialogMessage)){
        const updatedUser = {...filterListByName[0], number:newPhone}
        phonebookService
          .updateContact(updatedUser.id, updatedUser)
          .then(response=>{
            phonebookService.getAllContacts().then(responseGet =>{
              setPersons(responseGet)
            })
            showNotification(`Changed '${newPerson.name}'`)
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

  const deleteContact = (id) =>{
    if(dialogWindowResponse("Are you sure you want to delete?")){
      phonebookService
        .removeContact(id)
        .then(response =>{
          phonebookService.getAllContacts().then(responseGet =>{
            setPersons(responseGet)
          })
        })
        .catch(error=> {
          console.log('teste');
          setError(true)
          //showNotification(`This information has already been deleted, try refresh the page`)
          showNotification(error.response.data.error)
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

  const showNotification = (notification) => {
    setNotification(notification)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const dialogWindowResponse = (message) => {
    return window.confirm(message);
  }

  return (
    <div style={{paddingLeft: '50px'}}>
      <h2>Phonebook</h2>
      <Notification message={notification} error={error}></Notification>
      <PersonForm addName={addContact}
                  newName={newName}
                  newPhone={newPhone}
                  handleNameChange={handleNameChange}
                  handlePhoneChange={handlePhoneChange}></PersonForm>     
      <h3>Numbers</h3>
      <Filter handleSearchChange={handleSearchChange} value={newSearch}></Filter>
      <div>
        {filteredPhone.map(person => 
          <Person key={person.id} person={person} deletePhone={()=> deleteContact(person.id)}></Person>
        )}
      </div>
    </div>
  )
}

export default App