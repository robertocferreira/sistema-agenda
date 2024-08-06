const urlAPI = 'http://JFADE00000100393:3333';

let idUsuario = localStorage.getItem('idUsuario');
//Se o usuario estiver logada
//vamos ter armazenado idUsuario no localStorage
export function verificarLogin(){
    if (idUsuario){
        return true;
    } else {
        return false;
    }
}

export function deslogar(){
    localStorage.removeItem('idUsuario');
    idUsuario = null;
}

export async function logar(dados){
    const resposta = await fetch(`${urlAPI}/logar`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
    });

    const mensagem = await resposta.json();

    if (resposta.status == 200){
        alert(`Usuario logado: idUsuario:${mensagem.idUsuario}`)
        localStorage.setItem('idUsuario', mensagem.idUsuario);
        window.location.href = 'agenda.html';
    }

    if (resposta.status == 400){    
        alert(mensagem.message)
    }
}
