const express=require ('express')
const app = express()
const bodyParser=require('body-parser')
const morgan=require('morgan')
const cors=require('cors')
const Person=require('./models/person')

app.use(express.static('build'))
app.use(cors())
morgan.token('content', function getContent(req) {
    return JSON.stringify(req.body)
})

app.use(bodyParser.json())

app.use(morgan(':method :url :content :status :res[content-length] - :response-time ms'))
const generateId =()=> Math.floor(Math.random()*1000)
const formatContacts =(person) => {
  return {
    name:person.name,
    number:person.number,
    date:person.date,
    id:person._id

  }
}
const personExists =(thisName)=> {
  Person
    .find({name: thisName})
    .then(result => {
      if(result.length!==0){
        console.log('hei hei')
        return true
      }
      else {
        console.log('ho')
        return false
      }
    })
}

app.get('/api/persons',(request, response)=>{
  Person
    .find({})
    .then(persons => {
      response.json(persons.map(formatContacts))
    })
})
app.get('/info', (request, response) => {
  Person
    .find({})
    .then(persons => {
      response.send(`<p>puhelinluettelossa ${persons.length} henkilön tiedot</p><p>${new Date()}</p>`)
    })
    /**console.log(new Date())
    response.send(`<p>puhelinluettelossa ${persons.length} henkilön tiedot</p><p>${new Date()}</p>`)**/
})

app.get('/api/persons/:id', (request, response) => {
    Person
      .findById(request.params.id)
      .then(person => {
        if (person) {
          response.json(formatContacts(person))
        } else {
          response.status(404).end()
        }
      })
      .catch(error => {
        console.log(error)
        response.status(400).send({error:'malformatted id'})
      })
})

app.delete('/api/persons/:id', (request, response) => {
    Person
      .findByIdAndRemove(request.params.id)
      .then(result => {
        response.status(204).end()
      })
      .catch(error => {
        response.status(400).send({error: 'malformatted id'})
      })
})
app.post('/api/persons', (request, response) => {
    const body=request.body

    Person
      .find({name: body.name})
      .then(result => {
        if (result.length>0) {
          console.log('hei')
          response.status(400).json({error: 'name must be unique'})
        }else {




  /**  if (body.name===undefined || body.number===undefined) {
        return response.status(400).json({error: 'content missing'})
    }
    if(persons.map(person=>person.name).includes(body.name)){
        return response.status(400).json({error: 'name must be unique'})
    }**/
    const contact = new Person({
        name: body.name,
        number: body.number,
        date: new Date()
    })
    contact
      .save()
      .then(savedContact => {
        response.json(formatContacts(savedContact))
      })
    }
    })

})
app.put('/api/persons/:id', (request, response) => {
  const body=request.body

  const contact= {
    name: body.name,
    number: body.number
  }
  Person
    .findByIdAndUpdate(request.params.id, contact, {new: true} )
    .then(updatedContact => {
      response.json(formatContacts(updatedContact))
    })
    .catch(error => {
      console.log(error)
      response.status(400).send({error: 'malformatted id'})
    })

})

const PORT = process.env.PORT || 3001
app.listen(PORT, ()=>{
    console.log(`Server runninng on port ${PORT}`)
})
