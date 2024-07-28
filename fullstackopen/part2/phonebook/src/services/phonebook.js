import axios from 'axios'
const baseUrl = '/api/persons'

const getAllContacts = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createContact = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const updateContact = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const removeContact = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

export default { getAllContacts: getAllContacts, createContact: createContact, updateContact: updateContact, remove: removeContact }