class UsuarioController {

    static rotas(app){
        app.get('/usuario', UsuarioController.listar)
        app.post('/usuario', UsuarioController.inserir)
    }


    //GET
    static listar(req, res){
        res.send("Rota GET do usuario ativada: ")
    }


    //POST
    static inserir(req, res){
        res.send("Rota POST do usuario ativada: ")
    }
}

module.exports = UsuarioController