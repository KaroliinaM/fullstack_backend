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


app.get('/api/persons',(request, response)=>{
  Person
    .find({})
    .then(persons => {
      response.json(persons)
      Person.hello()
    })
})
app.get('/info', (request, response) => {
    console.log(new Date())
    response.send(`<p>puhelinluettelossa ${persons.length} henkilön tiedot</p><p>${new Date()}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
    const id= Number(request.params.id)
    const person=persons.find(person => person.id===id)

    if(person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id =Number(request.params.id)
    console.log(id)
    persons=persons.filter(person=> person.id !==id)

    response.status(204).end()
})
app.post('/api/persons', (request, response) => {
    const body=request.body

    if (body.name===undefined || body.number===undefined) {
        return response.status(400).json({error: 'content missing'})
    }
    if(persons.map(person=>person.name).includes(body.name)){
        return response.status(400).json({error: 'name must be unique'})
    }





    const contact = {
        name: body.name,
        number: body.number,
        date: new Date(),
        id: generateId()
    }

    persons=persons.concat(contact)



    response.json(contact)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, ()=>{
    console.log(`Server runninng on port ${PORT}`)
})
