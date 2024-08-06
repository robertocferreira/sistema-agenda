import { verificarLogin, getUsuario } from "./sistema.js";

if (verificarLogin() == false){
    window.location.href = "login.html";
}

const usuario = await getUsuario();

if (usuario != null){
    const h1 = document.querySelector('h1');
    h1.innerHTML = `Agenda de ${usuario.nome}`;
}