const Usuario = require('../models/Usuario')

function usuarioGet(app) {
    app.get('/usuario', (req, res) => {
        const usuario = new Usuario('Caio', 'caio@fluzao.com', '123')
        res.send({"Rota do usuário ativada: ": usuario } )
        console.log(usuario)
    })
}

function usuarioPost(app) {
    app.post('/usuario', (req, res) => {
        const usuario = new Usuario('Joao', 'joao@bol.com', '345')
        res.send({"Rota do usuário ativada: ": usuario } )
        console.log(usuario)
    })
}


module.exports = { usuarioGet, usuarioPost }