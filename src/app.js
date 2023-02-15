// Importando o packages
const express = require('express')

// instanciando o servidor
const app = express()

// configurando o servidor para receber requisições com o corpo no formato JSON
app.use(express.json())

// importando os controllers
const usuarioController = require('./controllers/usuarioController.js')
const tarefaController = require('./controllers/tarefaController.js')

usuarioController.rotas(app)
tarefaController.rotas(app)

module.exports = app
