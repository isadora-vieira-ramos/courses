require('dotenv').config()
const Person = require('./models/person')
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

app.post('/api/persons', (request, response) => {
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
  })
})

app.get('/api/persons/:id', (request, response) =>{
  Person.findById(request.params.id).then(note => {
    response.json(note)
  })
})

app.get('/api/info', async (request, response) => {
  const count = await Person.collection.countDocuments();
  const date = new Date();
  response.send(`<p>Phonebook has info for ${count} people</p></br><p>${date}</p>`)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
