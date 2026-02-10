import { post } from "./peticiones.js";
import { REGEX_EMAIL } from "./utilidades.js";
import { REGEX_PASS } from "./utilidades.js";
document.addEventListener("DOMContentLoaded", asignarManejadores)

function asignarManejadores() {

    document.getElementById("formRegistro").addEventListener("submit", validar);
    document.getElementById("nombre").addEventListener("blur", validarNombre);
    document.querySelector("#apellidos").addEventListener("blur", validarApellidos)
    document.querySelector("#email").addEventListener("blur", validarEmail)
    document.querySelector("#repetirEmail").addEventListener("blur", validarRepetirEmail);
    document.querySelector("#password").addEventListener("blur", validarPassword);
    document.querySelector("#repetirPassword").addEventListener("blur", validarRepetirPassword);
    document.querySelector("#condiciones").addEventListener("change", validarCondiciones);
}

function validar(e) {
    e.preventDefault();
    if (validarNombre({ target: document.querySelector("#nombre") }) &&
        validarApellidos({ target: document.querySelector("#apellidos") }) &&
        validarEmail({ target: document.querySelector("#email") }) &&
        validarRepetirEmail({ target: document.querySelector("#repetirEmail") }) &&
        validarPassword({ target: document.querySelector("#password") }) &&
        validarRepetirPassword({ target: document.querySelector("#repetirPassword") }) &&
        validarCondiciones({ target: document.querySelector("#condiciones") })) {
        const email = document.querySelector("#email").value;

        const nuevoUsuario = {
            nombre: document.querySelector("#nombre").value,
            apellidos: document.querySelector("#apellidos").value,
            email: email,
            password: document.querySelector("#password").value,
            news: document.querySelector("#news").checked
        };

        post('/usuarios',
            nuevoUsuario,
            (data) => {
                alert("usuario registrado"),
                    console.log(data)
            },
            (error) => alert("Error al registrar"))
    }
}

function validarNombre(e) {
    switch (true) {
        case e.target.value.length < 3:
            document.getElementById("errorNombre").innerHTML = "Longitud mínima del nombre es 3 caracteres";
            return false;
            break;
        case e.target.value.charAt(0) !== e.target.value.charAt(0).toUpperCase():
            document.getElementById("errorNombre").innerHTML = "El primer caracter del nombre debe ser mayúscula";
            break;
        default:
            document.getElementById("errorNombre").innerHTML = "";
            return true;
    }
}
function validarApellidos(e) {

    switch (true) {
        case e.target.value.length < 3:
            document.getElementById("errorApellidos").innerHTML = "Longitud mínima del nombre es 3 caracteres";
            return false;
            break;
        case e.target.value.charAt(0) !== e.target.value.charAt(0).toUpperCase():
            document.getElementById("errorApellidos").innerHTML = "El primer caracter del nombre debe ser mayúscula";
            break;
        default:
            document.getElementById("errorApellidos").innerHTML = "";
            return true;
    }

}

function validarEmail(e) {
    switch (true) {
        case e.target.value.length < 3:
            document.getElementById("errorEmail").innerHTML = "Longitud mínima del email es 3 caracteres";
            return false;
            break;
        case !REGEX_EMAIL.test(e.target.value):
            document.getElementById("errorEmail").innerHTML = "Formato de email no válido";
            return false;
            break;
        default:
            document.getElementById("errorEmail").innerHTML = "";
            return true;
    }
}

function validarRepetirEmail(e) {
    const email = document.querySelector("#email").value;
    switch (true) {
        case e.target.value.length < 3:
            document.getElementById("errorRepetirEmail").innerHTML = "Longitud mínima del email es 3 caracteres";
            return false;
            break;
        case e.target.value !== email:
            document.getElementById("errorRepetirEmail").innerHTML = "Los emails no coinciden";
            return false;
            break;
        default:
            document.getElementById("errorRepetirEmail").innerHTML = "";
            return true;
    }
}

function validarPassword(e) {
    switch (true) {
        case e.target.value.length < 8:
            document.getElementById("errorPassword").innerHTML = "La contraseña debe tener al menos 8 caracteres";
            return false;
            break;
        case !REGEX_PASS.test(e.target.value):
            document.getElementById("errorPassword").innerHTML = "La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial";
            return false;
            break;
        default:
            document.getElementById("errorPassword").innerHTML = "";
            return true;
    }
}
function validarRepetirPassword(e) {
    const password = document.querySelector("#password").value;
    switch (true) {
        case e.target.value.length < 8:
            document.getElementById("errorRepetirPassword").innerHTML = "La contraseña debe tener al menos 8 caracteres";
            return false;
            break;
        case e.target.value !== password:
            document.getElementById("errorRepetirPassword").innerHTML = "Las contraseñas no coinciden";
            return false;
            break;
        default:
            document.getElementById("errorRepetirPassword").innerHTML = "";
            return true;
    }
}
function validarCondiciones(e) {
    if (!e.target.checked) {
        document.getElementById("errorCondiciones").innerHTML = "Debes aceptar las condiciones para registrarte";
        return false;
    } else {
        document.getElementById("errorCondiciones").innerHTML = "";
        return true;
    }
}