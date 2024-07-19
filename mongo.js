const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://tonylam:${password}@cluster.6hp2tkl.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const People = mongoose.model('Person', personSchema)

// if name and number are presented as arguments, add person
if (name && number) {
  const note = new People({
    name: name,
    number: number,
  })

  note.save().then(() => {
    console.log('note saved!')
    mongoose.connection.close()
  })
  // if these are missing return all persons
} else {
  People.find({}).then((result) => {
    console.log('phonebook:')
    result.forEach((people) => {
      console.log(`${people.name} ${people.number}`)
    })
    mongoose.connection.close()
  })
}
