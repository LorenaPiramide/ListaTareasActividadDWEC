// Validación del login
import { URL_SERVER } from './constantes.js';

const errorEl = document.getElementById("errorLogin");
const btnLogin = document.getElementById("btnLogin");

if (!btnLogin) {
    console.error("No se encontró el botón #btnLogin");
} else {
    btnLogin.addEventListener("click", function (e) {
        e.preventDefault();
        if (errorEl) errorEl.textContent = "";

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value;

        if (!username || !password) {
            if (errorEl) errorEl.textContent = "Debes completar todos los campos.";
            return;
        }

        if (errorEl) errorEl.textContent = "Conectando...";

        fetch(URL_SERVER + "login", {method: "GET"})
            .then(function (response) {
                if (!response.ok) {
                    throw new Error("Error del servidor: " + response.status);
                }
                return response.json();
            })
            .then(function (users) {
                const found = Array.isArray(users) && users.some(function (u) {
                    return u.username === username && u.password === password; 
                });
                if (found) {
                    if (errorEl) errorEl.textContent = "";
                    window.location.href = "tareas.html";
                } else {
                    if (errorEl) errorEl.textContent = "Campos incorrectos.";
                }
            })
            .catch(function (err) {
                console.error("Error:", err);
                if (errorEl) errorEl.textContent = "Error: " + (err.message || "no se pudo conectar");
            });
    });
}