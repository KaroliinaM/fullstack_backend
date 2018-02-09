
const mongoose=require('mongoose')
const url='mongodb://fullstack:<salasana>@ds229388.mlab.com:29388/fullstack_phonebook'

mongoose.connect(url)

const Person=mongoose.model('Person', {
  name: String,
  number: String
})

if(process.argv.length>2)
{
  const person=new Person({
    name: process.argv[2],
    number: process.argv[3],
    date: new Date()
  })
  person
    .save()
    .then(response =>{
      console.log('contact saved')
      mongoose.connection.close()
    })


}
else {
  Person
    .find({})
    .then(result => {
      result.forEach(person => {
        console.log(person)
      })
      mongoose.connection.close()
    })

}
