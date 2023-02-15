// ASYNC e AWAIT

// Aqui, em todas os métodos statics existe a palavra ASYNC, isso faz com que a requisição seja ASSÍNCRONA. Na prática quer dizer, que para a execução desse código, o JS não deve ficar aguardande a resposta dessa função para, só então executar os próximos passos do código. Não. Mesmo que a resposta da função não tenha vindo, ele segue o fluxo, mas sbendo que o retorno ainda está por vir, QUE É A RESOLUÇÃO DAS PROMESSAS na CLASSE UsusarioDAO e POR ISSO dentro das funções ASYNC(), as chamada que invocam uma outra função, temos uma outra palavra que é o AWAIT, que quer dizer "AGUARDE, fique atento aí, que estou esperando a resposta PROMETIDA"....

// DICA: 
// Hoje em dia sempre usamos ASYNC AWAIT, quando conectamos algo a Banco de Dados, mas não é só para isso, pode ser usada quando não se pretende travar o fluxo, aguardando um retorno de uma função ou quando   você precisa se conectar a algo que demora ao retornar uma RESPOSTA. 



// Classe importada para fazer o acesso ao Banco de Dados. Sempre que a API precisar acessar o Banco, Controller irá chamá-la e ela que fará o acesso ao banco.
const UsuarioDAO = require('../DAO/UsuarioDAO.js')
const Usuario = require('../models/Usuario.js')


// Classe usuário Controller. Aqui usamos a ideia de Orientação a Objetos ao trabalhar com Classes e Métodos.
// Essa classe contém apenas métodos statics. Os métodos estáticos podem ser usados sem a necessidade de instanciar a classe que os contém. 
// Então NÃO PRECISAMOS declarar uma const ou let assim:  const usuario = new usuarioController().
// Os métodos statics são chamados pelo nome da própria classe, seguida do método. Assim: usuarioController.nomeDoMetodo
class usuarioController {
    static rotas(app){
        // Rotas para os recursos Usuario. O endpoint das rotas aparece na primeira parte entre aspas.  O que vem depois sãos os métodos que trabalharão com as requisições.
        app.get('/usuario', usuarioController.listar)
        app.get('/usuario/email/:email', usuarioController.buscarPorEmail)
        app.post('/usuario', usuarioController.inserir)
        app.put('/usuario/email/:email', usuarioController.atualizaUsuario)
        app.delete('/usuario/email/:email', usuarioController.deletarUsuario)
    }



    // GET
    // Abaixo todos os métodos dessa classe são estáticos, isso quer dizer que podemos usá-los, SEM a necessidade de instanciá-los usando a palavrinha NEW    
    static async listar(req, res){
        // Chama a classe usuarioDAO com o método listar para fazer acesso ao Banco de Dados.  
        const usuarios = await UsuarioDAO.listar()

        // Devolve a lista de usuarios e o status code 200, quer dizer que a requisição foi bem sucedida.
        res.status(200).send(usuarios)
    }



    // GET
    // Busca no banco o usuário que tem o email específico
    static async buscarPorEmail(req, res){
        // Classe UsuarioDAO é chamada com o método de Busca ao email na lista de usuarios e recebe o usuário completo como retorno
        const usuario = await UsuarioDAO.buscarPorEmail(req.params.email)

        // Se o usuario não for encontrado, devolve um erro 404. Significa "Não encontrado"
        if(!usuario){
            // O status code que informa se o conteúdo não foi encontrado
            res.status(404).send('Usuário não encontrado')
        }

        // Se o usuario for encontrado, devolve o usuario na tela e envia o status code 200, que quer dizer Operação Bem Suceddida
        res.status(200).send(usuario)
    }



    // POST
    // Cadastra no Banco
    static async inserir(req, res){
        // Cria um novo usuario recebendo as informações que vem do corpo da requisição através do req.body     
        const usuario = {
            nome: req.body.nome,
            email: req.body.email,
            senha: req.body.senha
        }

        // Verifica se o corpo da requisição está sendo enviado com todas as chaves, se faltar alguma chave, entra no If e dá um status de requisição mal sucedida, dá um return encerrando a função.
        if(!usuario || !usuario.nome || !usuario.email || !usuario.senha) {
            res.status(400).send("Precisa passar as informações")
            return
        }

        // Classe UsuarioDAO é chamada com o método inserir para adicionar o usuario na tabela de usuarios no banco e retorna o resultado da operação que é o próprio usuário cadastrado     
        const result = await UsuarioDAO.inserir(usuario)

        // Se o resultado retornado não for o usuário que enviamos, ele trará a informação da chave erro. Esse retorno de erro tem ligação com uma funcão de conexão do próprio SQLite. Se entrar no If, dá um status code 500.
        if(result.erro) {
            res.status(500).send(result)
        }

        // Se o cadastro ocorrer tudo OK, devolve o status code 201, que é o ideal para ROTAS POST, que quer dizer: Recurso Criado, ou seja, houve a cadastro de algo no banco. 
        // Abaixo personalizamos a resposta que será mostrada, em caso de status 201. Além de uma mensagem, mostramos também objeto cadastrado
        res.status(201).send({"Menssagem": "Usuário Criado com Sucesso", "Novo Usuário: ": usuario})       
    }



    // PUT
    // Atualiza os dados no Banco de Dados
    static async atualizaUsuario(req,res) {
        // Classe UsuarioDAO é chamada com o método de busca pelo email afim de saber/encontrar o usuário no banco, "talvez ele possa não está cadastrado", se encontrar o usuário, retorna-o a constante email.
        const email = await UsuarioDAO.buscarPorEmail(req.params.email)

        // Se a constante email não contiver o usuário, quer dizer que o usuário não está cadastrado. Então, entra no if, respode status code 404, que quer dizer "Não encontrado", envia um res.send com uma mensagem e dá um return para encerrar a função
        if(!email) {
            res.status(404).send("Email não encontrado")
            return
        }

        // Se chegar até aqui é pq o email foi encontrado, então cria uma constante que receberá um classe instanciada do tipo Usuario e recebe através do Objeto REQ, para cada atributo uma informação específica, como nome, email e senha através do req.body.nome, req.body.email, req.body.senha. O objeto REQ, é um objeto da requisição que vem com os DADOS que foram ENVIADOS pelo front na hora da requisição.
        // IMPORTANTE: O REQ é um Objeto do Express do tipo chave e valor. Ele está trazendo os dados dentro da chave BODY, que por sua vez, também está trazendo os dados dentro de outras chaves no BODY, que são nome, email e senha. O Importante aqui é saber que o BODY NÃO EXISTE nativamente dentro do OBJETO REQ, ele foi criado depois da inserção do midlleway body-parse. Lembre que usamos essa linha lá no servidor:  app.use(express.json()). Isso informa/habilita para o express trabalhar com os dados em JSON nas nossas rotas
        const usuario = new Usuario(req.body.nome, req.body.email, req.body.senha)



        // Verifica, se todas as chaves foram enviadas e prenchidas com valores, se não, entra no if, gera um status code 400. Requisição Mal Sucedida e dá um return encerrando a função
        if(!usuario || !usuario.nome || !usuario.email || !usuario.senha) {
            res.status(400).send("Precisa passar todas as informações")
            return
        }

        // Verifica se existem chaves no objeto usuario. OBS: Nessa implementação, da forma que está, a funcionalidade dele não está sendo aproveitada, pois sempre haverão chaves, mesmo que vazias. O que esse método testa é: apenas se há chaves. As chaves são criadas na instancia do objeto new Usuario(req.body.nome, req.body.email, req.body.senha), se os dados não vierem no REQ.BODY, mesmo assim elas irão existir, porém vazias. Ele só está aqui, como demonstração....   
        if(!Object.keys(usuario).length) {
            res.status(400).send('O objeto está sem chave')
            return
        }

        // Classe UsuarioDAO é chamada com o método atualizar para acessar o banco e cadastrar o objeto usuário. Observe que estamos enviando o usuário criado e preenchido como o req.body... logo acima. Também passaremos o email por parâmetro pela URL do nosso endpoint, pois na clase UsuarioDAO será verificado o suário certo que será feita a atualização. Lembre-se: Quem faz o acesso ao banco é a classe DAO, por isso estamos a chamando
        const result = await UsuarioDAO.atualizar(req.params.email, usuario)
        
        // Se o resultado contiver erro, ele entrará no if e dará um status code 500 para erros de servidor
        if (result.erro) {
            res.status(500).send('Erro ao atualizar o usuário')
            return
        }

        // Tudo correndo certo, uma mensagem será informada com o status de bem sucedido (200). Também personalizamos um pouco o response (resposta) para mostrar como ficaram as informações do usuário.
        res.status(200).send({"Menssagem": "Dados atualizado", "Usuário: ": usuario})        
    }



    static async deletarUsuario(req, res){ 
        // Chama o UsuarioDAO.buscarPorEmail para verificamos se o email existe no banco, se existir, recuperamos os valores para a constante usuário    
        const usuario = await UsuarioDAO.buscarPorEmail(req.params.email)

        // Caso a buscao pelo email não consiga encontrar o email buscado, entra no if e retorna um status code 404, que quer dizer "Não Encontrado" e dá um retorno na função encerrando o procedimento. O código não quebra.
        if(!usuario) {
            res.status(404).send({'Menssagem': 'Usuário não encontrado'})
            return
        }


        // Envia a constante email do usuário para UsuarioDAO.deletar. O email será necessário, pois é uma informação úncia para cada pressoa. Não pode haver duas pessoas diferente com email.
        const result = await UsuarioDAO.deletar(req.params.email)

        // Se o usuario não for encontrado, devolve um erro staus code 400. Requisição mal sucedida
        if(result.erro){
           res.status(400).send({'Menssagem': 'Usuário não deletado'})
           return
        }
   
        // Status code 204 NÃO Devolve o usuario deletado || O status code 200, quer dizer solicitação bem sucedida. O status code 204 pode ser usada aqui ao invés do 200, porém se for usado o status 204, a resposta nõa fai ser impressa na tela
        res.status(200).send(result)
    }
}


//  Exporta o usuarioController para poder ser acessado a partir de outros arquivos
module.exports = usuarioController