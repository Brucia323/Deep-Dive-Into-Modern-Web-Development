const mongoose = require("mongoose");

const url = 'mongodb://localhost:27017/phonebook?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false'

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

// const name = process.argv[2]

// const number=process.argv[3]

// const person = new Person({
//     name: name,
//     number: number
// })

// person.save().then(result => {
//     console.log('person saved!');
//     mongoose.connection.close()
// })

Person.find({}).then(persons => {
    persons.forEach(person => {
        console.log(person);
    })
    mongoose.connection.close()
})