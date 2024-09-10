import { verificarLogin, getUsuario, getContatos } from "./sistema.js";

if (verificarLogin() == false){
    window.location.href = "login.html";
}

const usuario = await getUsuario();

if (usuario != null){
    const h1 = document.querySelector('h1');
    h1.innerHTML = `Agenda de ${usuario.nome}`;

    const listaContatos = await getContatos();
    preencherTabela(listaContatos);
}


function preencherTabela(listaContatos){
    const tbody = document.querySelector('tbody');
    let linhas = '';
    
    listaContatos.forEach(contato => {
        if (contato){
            linhas = linhas + `<tr>
                                <td>${contato.nome}</td>
                                <td>${contato.telefone}</td>
                                <td>${contato.endereco}</td>
                                <td>${contato.email}</td>
                                <td>
                                    <a href='./alterarContato.html?idContato=${contato.idContato}'>
                                        ✏️
                                    </a>
                                </td>
                                <td>
                                    <a href='./removerContato.html?idContato=${contato.idContato}'>
                                        🗑️
                                    </a>
                                </td>
                            </tr>`
        }
        
    });

    tbody.innerHTML = linhas;
}
