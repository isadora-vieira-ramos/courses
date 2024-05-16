const http = require('http')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())
app.use(express.static('dist'))

let people = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

morgan.token('host', function(req, res) {
    return req.hostname;
});

morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'));

app.get('/api/persons', (request, response) => {
  response.json(people)
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  const name = people.find(person => person.name.toUpperCase() == body.name.toUpperCase())

  if (!body || !body.number || !body.name) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  if(name){
    return response.status(400).json({ 
      error: 'name must be unique' 
    })
  }

  const person = {
    id: Math.floor(Math.random() * 10000),
    number: body.number,
    name: body.name,
  }

  people = people.concat(person)

  response.json(person)
})

app.get('/api/persons/:id', (request, response) =>{
    const id = Number(request.params.id);
    const person = people.find(person => person.id == id);

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.get('/api/info', (request, response) => {
  const count = people.length;
  const date = new Date();
  response.send(`<p>Phonebook has info for ${count} people</p></br><p>${date}</p>`)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  people = people.filter(people => people.id !== id)

  response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
