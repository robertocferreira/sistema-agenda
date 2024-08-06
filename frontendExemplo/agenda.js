import { verificarLogin } from "./sistema.js";

if (!verificarLogin()){
    window.location.href = 'login.html';
}