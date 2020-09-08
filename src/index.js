const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()
require('express-group-routes')

const app = express()
const port = process.env.PORT
console.log('COBA UPDATE GIT')
// Import Controller
const todoController = require('./controller/todoController')

app.use(bodyParser.json())

app.group('/api/v1', (router) => {
    router.get('/todos', todoController.index)
    router.post('/todo', todoController.create)
    router.get('/todo/:id', todoController.show)
    router.delete('/todo/:id', todoController.destroy)
    router.put('/todo/:id', todoController.update)
}) 

app.listen(port, () => {
    console.log(`Development Mode running port ${port}`)
})