const urlAPI = 'http://JFADE00000100393:3333';

let idUsuario = localStorage.getItem('idUsuario');
export async function logar(dados) {
    try {
        const resposta = await fetch(`${urlAPI}/logar`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dados),
        });
    
        const info = await resposta.json();
    
        if (resposta.status == 200) {
            alert(`Usuario logado: idUsuario:${info.idUsuario}`)
            localStorage.setItem('idUsuario', info.idUsuario);
            window.location.href = 'agenda.html';
        }
        if (resposta.status == 400) {
            alert(info.message)
        }
    } catch(e){
        alert('Servidor fora do ar!!!');
    }
    
}
export function deslogar() {
    localStorage.removeItem('idUsuario');
    idUsuario = null;
    window.location.href = 'login.html';
}
export function verificarLogin() {
    if (idUsuario) {
        return true;
    } else {
        return false;
    }
}

export async function getUsuario(){
    if (idUsuario){
        try {
            const resposta = await fetch(`${urlAPI}/usuario/${idUsuario}`);
            const info = await resposta.json();

            if (resposta.status == 200){    
                return info;
            } else {
                alert(info.message);
            }
        } catch (e){
            alert('Servidor fora do ar!!!')
        }
    }

    return null;
}