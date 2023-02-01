
function usuario(app){
app.get('/usuario', (req, res) => {
    res.send('Rota Ativada com GET e recurso usuariosvalores de nome, email e senha  devem ser retornados')
  })
}

module.exports = usuario
  