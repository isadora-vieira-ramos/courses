require('dotenv').config()
const Person = require('./models/person')
const mongoose = require('mongoose')
const http = require('http')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())
app.use(express.static('dist'))


morgan.token('host', function(req, res) {
    return req.hostname;
});

morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'));

app.get('/api/persons', (request, response) => {
  Person.find({}).then(notes => {
    response.json(notes)
  })
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body || !body.number || !body.name) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const person = new Person({
    number: body.number,
    name: body.name,
  });

  person.save().then(savedPerson => {
    response.json(savedPerson)
  }).catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) =>{
  Person.findById(request.params.id).then(note => {
    if(note){
      response.json(note)
    }else{
      response.status(404).end()
    }
  }).catch(error => next(error))
})

app.get('/api/info', async (request, response) => {
  const count = await Person.collection.countDocuments();
  const date = new Date();
  response.send(`<p>Phonebook has info for ${count} people</p></br><p>${date}</p>`)
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const filter = { _id: request.params.id};
  const person = {
    number: request.body.number,
  };

  Person.findOneAndUpdate(filter, person)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint'})
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id'})
  }else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
