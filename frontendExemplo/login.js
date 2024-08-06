
import { logar } from "./sistema.js";

const btnEnviar = document.getElementById('btnEnviar');

btnEnviar.addEventListener('click', (e) => {
    e.preventDefault();
    const login = document.getElementById('login').value;
    const senha = document.getElementById('senha').value;

    logar({login: login, senha: senha})
})


