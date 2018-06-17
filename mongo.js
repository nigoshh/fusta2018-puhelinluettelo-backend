const mongoose = require('mongoose')

require('dotenv').config()
const url = process.env.MONGODB_URI

const args = process.argv

if (args.length > 4 || args.length === 3)
  return console.log('antaa joko kaksi tai nolla komentoriviparametria')
else {
  mongoose.connect(url)

  const Person = mongoose.model('Person', {
    name: String,
    number: String
  })

  if (args.length === 4) {
    const name = args[2]
    const number = args[3]
    const person = new Person({ name, number })

    person
      .save()
      .then(savedPerson => {
        console.log(`lisätään henkilö ${savedPerson.name} `
          + `numero ${savedPerson.number} luetteloon`)
        mongoose.connection.close()
      })
  } else {
    Person
      .find({})
      .then(persons => {
        console.log('puhelinluettelo:')
        persons.forEach(p => console.log(`${p.name} ${p.number}`))
        mongoose.connection.close()
      })
  }
}
