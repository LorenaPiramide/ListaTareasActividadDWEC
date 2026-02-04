// Validación del login
import { URL_SERVER } from './constantes';

document.getElementById("btnLogin").addEventListener("click", function() {

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (!username || !password) {
        document.getElementById("errorLogin").textContent = "Debes completar todos los campos.";
        return;
    }

    fetch(URL_SERVER + "/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);

        if (data.success) {
            alert("Login correcto");
        } else {
            document.getElementById("errorLogin").textContent = "Campos incorrectos.";
        }
    })
    .catch(error => console.error('Error: ', error));
});