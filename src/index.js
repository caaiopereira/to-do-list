const express = require('express')
const app = express()
const port = 3000   


app.use(express.json())


const { usuarioGet, usuarioPost } = require('./controllers/usuario-controller')
usuarioGet(app)
usuarioPost(app)

const { tarefaGet, tarefaPost } = require('./controllers/tarefa-controller')
tarefaGet(app)
tarefaPost(app)


app.listen(port, () => {
    console.log(`Servidor rodando na porta:${port}`)
})
