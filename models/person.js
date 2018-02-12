const mongoose=require('mongoose')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const url=process.env.MONGODB_URI

const Schema=mongoose.Schema
mongoose.connect(url)

const personSchema=new Schema({name: String,
number: String,
date: Date
})
personSchema.statics.format=function(person) {
  return {
    id:person._id,
    name:person.name,
    number:person.number,
    date:person.date
  }
}

const Person=mongoose.model('Person', personSchema)




module.exports=Person
