class TarefaController {

    static rotas(app){
        app.get('/tarefa', TarefaController.listar)
        app.post('/tarefa', TarefaController.inserir)
    }


    //GET
    static listar(req, res){
        res.send("Rota GET da tarefa ativada: ")
    }


    //POST
    static inserir(req, res){
        res.send("Rota POST da tarefa ativada: ")
    }
}

module.exports = TarefaController