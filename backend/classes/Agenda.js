import Usuario from './Usuario.js';

export default class Agenda {
    #usuarios

    constructor(){
        this.#usuarios = []
    }

    /*verifica se já existe um usuário como login informado */
    //Se já existir retorna o usuário com o login informado
    //Caso contrário retorna nulo
    jaExisteLogin(login){
        /*
        for (let ind = 0; ind < usuarios.length; ind++) {
            const usuario = usuarios[ind];
            if (usuario.login == login){
                return true;
            }
        }
        */
        const usuarios = this.#usuarios
        if (usuarios.find((usuario) => usuario.login == login)){
            return usuario;
        }
        return null;
    }

    cadastrarUsuario(nome, login, senha){
        //Se existir algum usuario com o login informado dispara um erro        
        if (this.jaExisteLogin(login)){
            throw new Error('Já existe um usuário com o login informado')
        }
        
        //Se não deu erro cadastra o usuário
        const idUsuario = this.#usuarios.length;
        const usuario = new Usuario(idUsuario, nome, login, senha);
        this.#usuarios.push(usuario);                
    }

    

    alterarUsuario(idUsuario, nome, login, senha){
        //Se não existe um usuário como idUsuario informado
        const usuario = this.buscarUsuario(idUsuario);
        if (usuario == undefined) {
            throw new Error('Não existe um usuário com o id informado');
        }
        
        //Se o novo login já é usado por outro usuário
        const usuLogin = this.jaExisteLogin(login)
        if (usuLogin && usuLogin.idUsuario != idUsuario){
            throw new Error('Não é possível mudar o login. O novo login já é utilizado por outro usuário');
        }

        //Se não disparou nenhum erro altera os dados do usuário
        usuario.nome = nome;
        usuario.login = login;
        usuario.senha = senha;
    }

    /*Retorna o usuário com o id informado. Se o usuário não existir no vetor vai retornar undefined*/
    buscarUsuario(idUsuario){
        return this.#usuarios[idUsuario];
    }

    get usuarios(){
        return this.#usuarios;
    }

    /*Retorna o idUsuario caso exista um usuário com o login e senha informados. Se não existir dispara um erro de login e senha inválido*/
    logar(login, senha){
        const usuarios = this.#usuarios;
        /*
        for (let ind = 0; ind < usuarios.length; ind++) {
            const usu = usuarios[ind];
            if (usu.login == login && usu.senha == senha){
                return usu.idUsuario;
            }
        }*/
        const usuario = usuarios.find((u) => u.login == login && u.senha == senha);
        if (usuario){
            return usuario.idUsuario;
        } 

        throw new Error('Login ou senha inválido');
    }
}