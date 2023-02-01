
function tarefas(app){
app.get('/tarefas', (req, res) => {
    res.send('Rota Ativada com GET e recurso tarefas valores de titulo, data de criação, status e descrição  devem ser retornados')
  })
}

module.exports = tarefas