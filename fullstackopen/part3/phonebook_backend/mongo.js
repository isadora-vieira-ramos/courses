const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
let name = null;
let number = null;
if(process.argv.length > 3){
    name = process.argv[3];
    number = process.argv[4];
}

const url =
  `mongodb+srv://isadora:${password}@cluster0.i2iwfzl.mongodb.net/PersonApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 5,
    required: true
  },
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: name,
  number: number,
})

if(process.argv.length>3){
    person.save().then(result => {
        console.log(`added ${name} number ${number} to your phonebook`)
        mongoose.connection.close()
    }) 
}else{
    Person.find({}).then(result => {
        console.log('phonebook:');
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`);
        })
        mongoose.connection.close()
    })
}