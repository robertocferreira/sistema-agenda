import { verificarLogin, getUsuario } from "./sistema.js";

if (verificarLogin() == false) {
    window.location.href = "login.html";
}

const usuario = await getUsuario();
console.log(usuario);

document.getElementById('nome').value = usuario.nome;
document.getElementById('login').value = usuario.login;
document.getElementById('senha').value = usuario.senha;

const btnEnviar = document.getElementById('btnEnviar');
btnEnviar.addEventListener('click', async (e) => {
    e.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const login = document.getElementById('login').value;
    let senha = document.getElementById('senha').value;
    console.log(senha);
    
})