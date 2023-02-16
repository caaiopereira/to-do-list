// Importa o bd.js para poder usar o banco de dados simulado


class tarefaController {
    static rotas(app){
        // Rota para o recurso tarefa
        app.get('/tarefa', tarefaController.listar)
        app.post('/tarefa', tarefaController.inserir)
    }

    static listar(req, res){
        const tarefas = bdTarefas
        // Devolve a lista de tarefas
        res.send(tarefas)
    }

    static inserir(req, res){
        res.send('Rota ativada com POST e recurso tarefa: tarefa deve ser inserida')
        // Console log do corpo da requisição
        console.log(req.body)
    }
}

module.exports = tarefaController