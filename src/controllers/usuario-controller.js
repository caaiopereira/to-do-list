// Importa o bd.js para poder usar o banco de dados simulado
const UsuarioDAO = require("../DAO/UsuarioDAO.js")
const { bdUsuarios } = require("../infra/bd.js")

const Usuario = require('../models/Usuario.js')

class usuarioController {
    static rotas(app){
        // Rota para o recurso usuario
        app.get('/usuario', usuarioController.listar)
        app.get('/usuario/email/:email', usuarioController.buscarPorEmail)
        app.post('/usuario', usuarioController.inserir)
        app.put('/usuario/email/:email', usuarioController.atualizarUsuario)
        app.delete('/usuario/email/:email', usuarioController.deletarUsuario)
    }
    

    static listar(req, res){
        //chama a classe usuarioDAO com o metodo listar. q agpra é responsavel pelo acesso
        const usuarios = UsuarioDAO.listar()

        // Devolve a lista de usuarios
        res.send(usuarios)
    }


    static inserir(req, res){
        const usuario = new Usuario(req.body.nome, req.body.email, req.body.senha)
        bdUsuarios.push(usuario)
        res.send(bdUsuarios)
        // Console log do corpo da requisição
        console.log(req.body)        
    }


    static buscarPorEmail(req, res){
        // Busca o email na lista de usuarios
        const usuario = bdUsuarios.find(usuario => usuario.email === req.params.email)
        console.log(usuario)
        // Se o usuario não for encontrado, devolve um erro
        if(!usuario){
            res.status(404).send('Usuário não encontrado')
        }
        // Se o usuario for encontrado, devolve o usuario
        res.send(usuario)
    }


    static deletarUsuario(req, res){
        // Busca o email na lista de usuarios
        const usuario = bdUsuarios.find(usuario => usuario.email === req.params.email)
        // Se o usuario não for encontrado, devolve um erro
        if(!usuario){
            res.status(404).send('Usuário não encontrado')
        }
        // Se o usuario for encontrado, deleta o usuario
        const index = bdUsuarios.indexOf(usuario)
        bdUsuarios.splice(index, 1)
        // Devolve o usuario deletado
        res.status(200).send({"Mensagem: ": `O usuário do email ${usuario.email} foi deletado`} )
    }

    static atualizarUsuario(req, res){
        // Busca o email na lista de usuarios
        const usuario = bdUsuarios.find(usuario => usuario.email === req.params.email)
        // Se o usuario não for encontrado, devolve um erro
        if(!usuario){
            res.send('Usuário não encontrado')
            return 
        }

        usuario.nome = req.body.nome
        usuario.email = req.body.email
        usuario.senha = req.body.senha

        res.send(bdUsuarios)
    }
}

module.exports = usuarioController