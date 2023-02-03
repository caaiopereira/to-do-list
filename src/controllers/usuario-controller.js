function usuarioGet(app) {
    app.get('/usuario', (req, res) => {
        res.send("Rota do usuário ativada: ")
    })
}

function usuarioPost(app) {
    app.post('/usuario', (req, res) => {
        res.send('Usuário cadastrado')
    })
}


module.exports = { usuarioGet, usuarioPost }