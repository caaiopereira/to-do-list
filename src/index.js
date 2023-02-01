const express = require('express')
const port = 3000
const app = express()

const tarefa = require('./controllers/tarefa-controller')
const usuario = require('./controllers/usuario-controller')
tarefa(app)
usuario(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
