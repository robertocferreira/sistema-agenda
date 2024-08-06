import { verificarLogin } from './sistema.js';

if (verificarLogin()) {
    window.location.href = 'agenda.html';
} else {
    window.location.href = "login.html"
}