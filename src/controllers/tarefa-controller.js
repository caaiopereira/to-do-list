function tarefaGet(app) {
    app.get('/tarefa', (req, res) => {        
        res.send('O que tem para Hoje: ')
    })
}

function tarefaPost(app) {
    app.post('/tarefa', (req, res) => {        
        res.send('Tarefa adicionada com sucesso')
    })
}

module.exports = { tarefaGet, tarefaPost }