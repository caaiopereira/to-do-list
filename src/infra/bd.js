const Usuario = require('../models/Usuario.js')
const Tarefa = require('../models/Tarefa.js')

// Cria vários objetos e os adiciona a um array para simular uma lista de objetos
const bdUsuarios = []
const bdTarefas = []

// Cria um objeto do tipo Usuario e adiciona a lista de usuarios
const usuario = new Usuario('Nome do usuário', 'email@email.com', 'Senha')
bdUsuarios.push(usuario)
// Cria um objeto do tipo Usuario e adiciona a lista de usuarios
const usuario2 = new Usuario('Nome do usuário 2', 'email2@email.com', 'Senha 2')
bdUsuarios.push(usuario2)




// Cria um objeto do tipo Tarefa e adiciona a lista de tarefas
const tarefa = new Tarefa('Título da tarefa', 'Descrição da tarefa', 'A fazer', new Date())
bdTarefas.push(tarefa)

const tarefa2 = new Tarefa('Título da tarefa 2', 'Descrição da tarefa 2', 'A fazer', new Date())
bdTarefas.push(tarefa2)

// Exporta as listas de objetos
module.exports = { bdUsuarios, bdTarefas }