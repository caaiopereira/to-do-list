class Tarefa{
    constructor(titulo, descricao, status, data){
        this.titulo = titulo
        this.descricao = descricao
        this.status = status
        this.data = new Date()
    }
}

module.exports = Tarefa