// Importa o bd.js para poder usar o banco de dados simulado
const { bdUsuarios } = require("../infra/bd");

// Essa classe encapsula o acesso ao Banco de Dados. Todos os métodos abaixos são estáticos. Isso quer dizer que não precisamos instanciar a classe para usá-los e serão chamados pela classe UsuarioController... Alguns vão dar retorno e para outros, isso não será necessário
class UsuarioDAO {
  static listar() {
    return bdUsuarios;
  }

  static inserir(usuario) {
    bdUsuarios.push(usuario);
  }

  static buscarPorEmail(email) {
    return bdUsuarios.find((usuario) => usuario.email === email);
  }

  static deletar(email) {
    const usuario = bdUsuarios.find((usuario) => usuario.email === email);
    const index = bdUsuarios.indexOf(usuario);
    bdUsuarios.splice(index, 1);
    return usuario;
  }

  static atualizar(email, usuario) {
    const usuarioAtual = bdUsuarios.find((usuario) => usuario.email === email);
    const index = bdUsuarios.indexOf(usuarioAtual);
    bdUsuarios[index] = usuario;
  }
}

// Exporta a classe
module.exports = UsuarioDAO;

