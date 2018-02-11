const mongoose=require('mongoose')
const url=process.env.MONGODB_URI

const Schema=mongoose.Schema
mongoose.connect(url)

const personSchema=new Schema({name: String,
number: String,
date: Date
})

const Person=mongoose.model('Person', personSchema)




module.exports=Person
