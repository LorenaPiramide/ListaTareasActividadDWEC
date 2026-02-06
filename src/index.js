// Validación del login
import { login } from "./peticiones.js";

document.addEventListener("DOMContentLoaded", () => {
    const error = document.getElementById("errorLogin");
    const btnLogin = document.getElementById("btnLogin");

    if (!btnLogin) {
        console.error("No se encontró el botón de login.");
        return;
    }

    btnLogin.addEventListener("click", function () {
        const email = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value;

        if (!email || !password) {
            error.textContent = "Debes completar todos los campos.";
            return;
        }

        login(email, password)
            .then(user => {
                sessionStorage.setItem("usuario", JSON.stringify(user));
                window.location.href = "tareas.html";
            })
            .catch(err => {
                console.error(err);
                error.textContent = err.message;
            });
    });
});

