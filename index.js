const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')
const app = express()

app.use(express.static('build'))
app.use(cors())
app.use(bodyParser.json())
morgan.token('body', req => JSON.stringify(req.body))
app.use(morgan(
  ':method :url :body :status :res[content-length] - :response-time ms'
))

app.get('/info', (req, res) =>
  Person
    .find({})
    .then(persons =>
      res.send(
        `<p>puhelinluettelossa ${persons.length} henkilön tiedot</p>`+
        `<p>${new Date()}</p>`
      )
    )
)

app.get('/api/persons', (req, res) =>
  Person
    .find({})
    .then(persons => res.json(persons.map(Person.format)))
)

app.get('/api/persons/:id', (req, res) =>
  Person
    .findById(req.params.id)
    .then(person =>
      person ?
        res.json(Person.format(person))
        :
        res.status(404).end()
    )
    .catch(() => res.status(400).send({ error: 'malformatted id' }))
)

app.post('/api/persons', (req, res) => {
  const name = req.body.name
  const number = req.body.number
  let error = ''
  if (!name)
    error += 'name missing'
  if (!number)
    error = append(error, 'number missing')
  if (error)
    res.status(400).json({ error })
  else
    new Person({ name, number })
      .save()
      .then(savedPerson => res.status(201).json(Person.format(savedPerson)))
      .catch(() => res.status(400).json({ error: 'name must be unique' }))
})

app.put('/api/persons/:id', (req, res) => {
  const { name, number } = req.body
  const person = { name, number }
  Person
    .findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatedPerson =>
      updatedPerson ?
        res.json(Person.format(updatedPerson))
        :
        res.status(404).end()
    )
    .catch(() => res.status(400).send({ error: 'malformatted id' }))
})

app.delete('/api/persons/:id', (req, res) =>
  Person
    .findByIdAndRemove(req.params.id)
    .then(removedPerson =>
      removedPerson ?
        res.status(204).end()
        :
        res.status(404).end()
    )
    .catch(() => res.status(400).send({ error: 'malformatted id' }))
)

const append = (str1, str2) => str1 ? (str1+', '+str2) : str2

const unknownRoute = (req, res) => res.status(404).send({
  error: 'unknown endpoint'
})

app.use(unknownRoute)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
