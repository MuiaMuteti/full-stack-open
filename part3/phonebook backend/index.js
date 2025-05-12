const express = require('express')
const app = express()
app.use(express.json())

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get("/api/persons", (request, response) => {
    response.json(persons)
})

app.get("/info", (request, response) => {
    const body = `<p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>`

    response.send(body)
})

app.get("/api/persons/:id", (request, response) => {
    const id = request.params.id
    const person = persons.find(pers => pers.id === id)

    if (person) {
        return response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id
  persons = persons.filter(pers => pers.id !== id)
  response.status(204).end()
})

const generateId = () => {
  return Math.floor(Math.random() * Date.now())
}

const nameExists = (name) => {
  return persons.find(pers => pers.name === name)
}

app.post("/api/persons", (request, response) => {
  const person = request.body
  if (!person.name) {
    return response.status(400).json({
      error: "name missing"
    })
  }
  if (!person.number) {
    return response.status(400).json({
      error: "number missing"
    })
  }
  if (nameExists(person.name)) {
    return response.status(400).json({
      error: "name must be unique"
    })
  }

  person.id = generateId()
  persons = persons.concat(person)
  response.json(person)
})

const PORT = 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})