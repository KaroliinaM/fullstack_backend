const mongoose=require('mongoose')
const url='mongodb://fullstack:@ds229388.mlab.com:29388/fullstack_phonebook'
const Schema=mongoose.Schema
mongoose.connect(url)

const personSchema=new Schema({name: String,
number: String,
date: Date
})

const Person=mongoose.model('Person', personSchema)

personSchema.statics.hello=function(){
  console.log("moi")
  return this
}


module.exports=Person
