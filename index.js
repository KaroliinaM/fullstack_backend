const express=require ('express')
const app = express()
const bodyParser=require('body-parser')
const morgan=require('morgan')
const mor=new morgan('tiny')

app.use(bodyParser.json())

app.use(mor)
const generateId =()=> Math.floor(Math.random()*1000)

let persons=[
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
      },
      {
        "name": "Martti Tienari",
        "number": "040-123456",
        "id": 2
      },
      {
        "name": "Arto Järvinen",
        "number": "040-123456",
        "id": 3
      },
      {
        "name": "Lea Kutvonen",
        "number": "040-123456",
        "id": 4
      }
]
app.get('/api/persons',(request, response)=>{
    response.json(persons)
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

const PORT = 3001
app.listen(PORT, ()=>{
    console.log(`Server runninng on port ${PORT}`)
})
