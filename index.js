const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()

app.use(bodyParser.json())
morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(
  ':method :url :body :status :res[content-length] - :response-time ms'
))

let persons = [
  {
    name: 'Arto Hellas',
    number: '040-123456',
    id: 1
  },
  {
    name: 'Martti Tienari',
    number: '040-123456',
    id: 2
  },
  {
    name: 'Arto Järvinen',
    number: '040-123456',
    id: 3
  },
  {
    name: 'Lea Kutvonen',
    number: '040-123456',
    id: 4
  }
]

app.get('/info', (req, res) => {
  res.send(
    `<p>puhelinluettelossa ${persons.length} henkilön tiedot</p>`+
    `<p>${new Date()}</p>`)
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = findById(id)
  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.post('/api/persons', (req, res) => {
  const name = req.body.name
  const number = req.body.number
  let error = '';
  if (!name)
    error += 'name missing'
  else if (findByName(name) !== undefined)
    error = append(error, 'name must be unique')
  if (!number)
    error = append(error, 'number missing')
  if (error)
    res.status(400).json({ error })
  else {
    const person = {
      name,
      number,
      id: generateId()
    }
    persons = persons.concat(person)
    res.status(201).json(person)
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const newPersons = persons.filter(p => p.id !== id)
  if (newPersons.length < persons.length) {
    res.status(204).end()
  } else {
    res.status(404).end()
  }
  persons = newPersons
})

const generateId = () => {
  let id = undefined
  do id = Math.floor(Math.random() * 100000)
  while (findById(id) !== undefined)
  return id
}

const findById = (id) => persons.find(p => p.id === id)

const findByName = (name) => persons.find(p => p.name === name)

const append = (str1, str2) => str1 ? (str1+', '+str2) : str2

const unknownRoute = (req, res) => res.status(404).send({
  error: 'unknown endpoint'
})

app.use(unknownRoute)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
