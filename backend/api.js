import express from 'express';

import cors from 'cors';
import { sistema } from './dadosMocados.js';

const app = express();
app.use(express.json());
//Se fossemos pegar os dados do formulário, usariamos o express.urlencoded app.use(express.urlencoded({ extended: true }));
// Middleware para interpretar dados de formulário

var corsOptions = {
    origin: "*"
};
app.use(cors(corsOptions));

const porta = 3333;

/*Login no sistema */
app.post('/logar', (req, res) => {
    try {
        const login = req.body.login;
        const senha = req.body.senha;
        const idUsuario = sistema.logar(login, senha);
        const jsonRes = JSON.stringify({idUsuario : idUsuario});
        res.status(200).json(jsonRes);
    } catch (error) {
        res.status(400).json({ message: `${error.message}` });
    }
})


/* rotas para usuario */
//Buscar um usuario
app.get('/usuario/:idUsuario', (req, res) => {
    try {
        const idUsuario = req.params.idUsuario;
        const usuario = sistema.buscarUsuario(idUsuario);
        if (!usuario) {
            res.status(404).json({ message : 'Usuário não encontrado!' });
        }
        const jsonRes = JSON.stringify(usuario);
        res.status(200).json(jsonRes);
    } catch (error) {
        res.status(400).json({ message : `${error.message}` });
    }
})
//Incluir um usuário
app.post('/usuario', (req, res) => {
    try {
        const nome = req.body.nome;
        const login = req.body.login;
        const senha = req.body.senha;
        sistema.cadastrarUsuario(nome, login, senha);
        res.status(201).json({ message : 'Usuário cadastrado!' });
    } catch (error) {
        res.status(400).json({ message : `${error.message}` });
    }
})
//Alterar um usuário
app.put('/usuario', (req, res) => {
    try {
        const idUsuario = req.body.idUsuario;
        const nome = req.body.nome;
        const login = req.body.login;
        const senha = req.body.senha;
        sistema.alterarUsuario(idUsuario, nome, login, senha);
        res.status(200).json({ message : 'Dados do usuário alterados com sucesso!' });
    } catch (error) {
        res.status(400).json({ message : `${error.message}` });
    }
})

/* rotas para contatos */
//Buscar os contatos de um usuário
app.get('/contatos/:idUsuario', (req, res) => {
    try {
        const idUsuario = req.params.idUsuario;
        const usuario = sistema.buscarUsuario(idUsuario);
        const jsonRes = JSON.stringify(usuario.contatos);
        res.status(200).json(jsonRes);
    } catch (error) {
        res.status(400).json({ message : `${error.message}` });
    }
})

//Buscar um contato de um usuário
app.get('/contato/:idUsuario/:idContato', (req, res) => {
    try {
        const idUsuario = req.params.idUsuario;
        const idContato = req.params.idContato;
        const usuario = sistema.buscarUsuario(idUsuario);
        const contato = usuario.contatos[idContato];
        if (!contato) {
            res.status(404).json({ message : 'Contato não encontrado!' });
        }
        const jsonRes = JSON.stringify(contato);
        res.status(200).json(jsonRes);
    } catch (error) {
        res.status(400).json({ message : `${error.message}` });
    }
})

//Adicionar um contato a um usuário
app.post('/contato', (req, res) => {
    try {
        const idUsuario = req.body.idUsuario;
        console.log('idUsuario', idUsuario);
        const usuario = sistema.buscarUsuario(idUsuario);
        console.log('usuario', usuario);

        const nome = req.body.nome;
        const telefone = req.body.telefone;
        const endereco = req.body.endereco;
        const email = req.body.email;

        usuario.adicionarContato(nome, telefone, endereco, email);

        res.status(201).json({ message : 'Contato cadastrado!' });
    } catch (error) {
        res.status(400).json({ message : `${error.message}` });
    }
})

//Alterar um contato de um usuário
app.put('/contato', (req, res) => {
    try {
        const idUsuario = req.body.idUsuario;
        const idContato = req.body.idContato;

        const usuario = sistema.buscarUsuario(idUsuario);
                
        const nome = req.body.nome;
        const telefone = req.body.telefone;
        const endereco = req.body.endereco;
        const email = req.body.email;

        usuario.alterarContato(idContato, nome, telefone, endereco, email)
        res.status(200).json({ message : 'Dados do contato alterados com sucesso!' });
    } catch (error) {
        res.status(400).json({ message : `${error.message}` });
    }
})

//Remover um contato de um usuário
app.delete('/contato/:idUsuario/:idContato', (req, res) => {
    try {
        const idUsuario = req.params.idUsuario;
        const idContato = req.params.idContato;
        const usuario = sistema.buscarUsuario(idUsuario);
        usuario.removerContato(idContato);
        res.status(200).json({ message : 'Contato removido!' });
    } catch (error) {
        res.status(400).json({ message : `${error.message}` });
    }
})


app.listen(porta, () => {
    console.log(`app rodando da porta ${porta}`)
})


