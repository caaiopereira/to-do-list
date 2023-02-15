// Importa o bd.js para poder usar o banco de dados simulado
const db = require("../infra/db");


// Essa classe encapsula o acesso ao Banco de Dados. Todos os métodos abaixos são estáticos. Isso quer dizer que não precisamos instanciar a classe para usá-los e serão chamados pela classe UsuarioController... Alguns vão dar retorno e para outros, isso não será necessário
class UsuarioDAO {

  // GET  --  Função ALL - Retorna todas as linhas. No callback existe o argumento ROWS
  static listar() {
    const query = "SELECT * FROM USUARIOS"; 
    return new Promise((resolve, reject) => {
      db.all(query, (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      });
    });
  }


  // GET  --  Função GET - Retorna APENAS UMA linha que será a linha do usuário dono do email que passamos por parâmetro. No callback existe o argumento ROW, no SINGULAR
  static buscarPorEmail(email) {
    const query = "SELECT * FROM USUARIOS WHERE email = ?";

    return new Promise((resolve, reject) => {
      db.get(query, [email], (err, row) => {
        if (err) {
          reject(false);
        }
        resolve(row);
      });
    });
  }


  // POST  --  Função RUN - Executa a função. No callback NÂO existe o argumento ROWS, apenas o argumento ERR, porém devolvemos os usuário
  static inserir(usuario) {
    const query = `INSERT INTO USUARIOS (nome, email, senha) VALUES (?, ?, ?)`;

    return new Promise((resolve, reject) => {
      db.run(query, [usuario.nome, usuario.email, usuario.senha], (err) => {
        if (err) {
          reject({
            messagem: "Erro ao inserir o usuário",
            erro: err,
          });
        }
        resolve(usuario);
      });
    });
  }


  // PUT  --   Função RUN - Executa a função. No callback NÂO existe o argumento ROWS, apenas o argumento ERR. Se tudo der certo, devolve o objeto: { mensagem: "Usuário atualizado com sucesso" }
  static atualizar(email, usuario) {
    const query =
      "UPDATE USUARIOS SET nome = ?, email = ?, senha = ? WHERE email = ?";
    return new Promise((resolve, reject) => {
      db.run(
        query,
        [usuario.nome, usuario.email, usuario.senha, email],
        (err) => {
          if (err) {
            reject({
              mensagem: "Erro ao atualizar o usuário",
              erro: err,
            });
          }
          resolve({ mensagem: "Usuário atualizado com sucesso" });
        }
      );
    });
  }


  // DELETE  --  Função RUN - Executa a função. No callback NÂO existe o argumento ROWS e nem ROW. Existe apenas o argumento ERR. Se tudo der certo, devolve o objeto: { mensagem: "Usuário deletado com sucesso", email: email }
  static deletar(email) {    
    const query = "DELETE FROM USUARIOS WHERE email = ?";
    return new Promise((resolve, reject) => {
      db.run(query, [email], (err) => {
        if (err) {
          reject({
            mensagem: "Erro ao deletar o usuário",
            erro: err,
          });
        }
        resolve({ mensagem: "Usuário deletado com sucesso", email: email });
      });
    });
  }
}


// Exporta a classe
module.exports = UsuarioDAO;
