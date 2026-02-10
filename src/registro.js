import { registro } from "./peticiones.js";

document.addEventListener("DOMContentLoaded", asignarValidacion);

function asignarValidacion() {
    let form = document.getElementById("formRegistro");
    if (!form) return;

    form.addEventListener("submit", validarFormulario);

    document.getElementById("nombre").addEventListener("blur", validarNombre);
    document.getElementById("apellidos").addEventListener("blur", validarApellidos);
    document.getElementById("email").addEventListener("blur", validarEmail);
    document.getElementById("repetirEmail").addEventListener("blur", validarRepetirEmail);
    document.getElementById("password").addEventListener("blur", validarPassword);
    document.getElementById("repetirPassword").addEventListener("blur", validarRepetirPassword);
    document.getElementById("condiciones").addEventListener("blur", validarCondiciones);
}

function validarFormulario(e) {
    e.preventDefault();

    const campos = [
        { elemento: nombre, nombreCampo: "Nombre" },
        { elemento: apellidos, nombreCampo: "Apellidos" },
        { elemento: email, nombreCampo: "Email" },
        { elemento: repetirEmail, nombreCampo: "Repetir Email" },
        { elemento: password, nombreCampo: "Password" },
        { elemento: repetirPassword, nombreCampo: "Repetir Password" }
    ];

    let hayVacios = false;

    // elemento → input.
    campos.forEach(c => {
        if (!c.elemento.value.trim()) {
            c.elemento.classList.add("resaltado");
            hayVacios = true;
        } else {
            // Quitamos la clase "resaltado" del elemento
            c.elemento.classList.remove("resaltado");
        }
    });

    if (!condiciones.checked) {
        condiciones.classList.add("resaltado");
        hayVacios = true;
    } else {
        condiciones.classList.remove("resaltado");
    }

    if (hayVacios) {
        errorRegistro.innerText = " No puedes dejar campos vacíos.";
        return;
    }

    if (!validarNombre({ target: nombre })) return;
    if (!validarApellidos({ target: apellidos })) return;
    if (!validarEmail({ target: email })) return;
    if (!validarRepetirEmail({ target: repetirEmail })) return;
    if (!validarPassword({ target: password })) return;
    if (!validarRepetirPassword({ target: repetirPassword })) return;
    if (!validarCondiciones({ target: condiciones })) return;

    if (errorRegistro) errorRegistro.innerText = "";

    // Guardamos los datos del usuario recién registrado
    let body = {
        nombre: nombre.value.trim(),
        apellidos: apellidos.value.trim(),
        email: email.value.trim(),
        password: password.value,
        condiciones: condiciones.checked,
        news: document.getElementById("news").checked
    };

    registro(body)
        .then(() => window.location.href = "index.html")
        .catch(() => errorRegistro.innerText = "No se ha podido realizar el registro.")
}

// Nombre: Obligatorio, longitud mínima 3 caracteres empezando por mayúscula. Informar de si cumple la validación al salir del campo.
function validarNombre(e) {
    const value = e.target.value.trim();
    const errorNombre = document.getElementById("errorNombre");
    if (value.length < 3) {
        e.target.classList.add("resaltado");
        errorNombre.innerText = "El nombre tiene que tener 3 letras como mínimo.";
        return false;
    }
    if (value.length > 0 && value[0] !== value[0].toUpperCase()) {
        e.target.classList.add("resaltado");
        errorNombre.innerText = "El nombre debe empezar por mayúscula.";
        return false;
    }
    e.target.classList.remove("resaltado");
    errorNombre.innerText = "";
    return true;
}

// Apellidos: Igual que el Nombre.
function validarApellidos(e) {
    const value = e.target.value.trim();
    const errorApellidos = document.getElementById("errorApellidos");
    if (value.length < 3) {
        e.target.classList.add("resaltado");
        errorApellidos.innerText = "El apellido debe tener al menos 3 letras como mínimo.";
        return false;
    }
    if (value.length > 0 && value[0] !== value[0].toUpperCase()) {
        e.target.classList.add("resaltado");
        errorApellidos.innerText = "Los apellidos deben empezar por mayúscula.";
        return false;
    }
    e.target.classList.remove("resaltado");
    errorApellidos.innerText = "";
    return true;
}

// Email: Obligatorio ya que lo usaremos como nombre de usuario para el inicio de sesión.
// TODO: Al pulsar el botón de envío y previo a intentar registrar el usuario realizaremos una petición al servidor para 
// comprobar si el email del usuario está disponible o ya está registrado. 
function validarEmail(e) {
    const regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    const email = e.target.value;

    if (!regex.test(email)) {
        e.target.classList.add("resaltado");
        document.getElementById("errorEmail").innerText = "El email no es válido.";
        return false;
    } else {
        e.target.classList.remove("resaltado");
        document.getElementById("errorEmail").innerText = "";
        return true;
    }
}

// Repetir Email: Comprobar que coincide con el Email.
function validarRepetirEmail(e) {
    const email = document.getElementById("email").value;
    const emailRepetido = e.target.value;

    if (email !== emailRepetido) {
        e.target.classList.add("resaltado");
        document.getElementById("errorRepetirEmail").innerText = "Los emails no coinciden.";
        return false;
    } else {
        e.target.classList.remove("resaltado");
        document.getElementById("errorRepetirEmail").innerText = "";
        return true;
    }
}

// Password: Obligatoria. Debe tener al menos 8 caracteres, incluyendo una letra mayúscula, una minúscula, un número y un carácter especial.
function validarPassword(e) {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
    const password = e.target.value;

    if (!regex.test(password)) {
        e.target.classList.add("resaltado");
        document.getElementById("errorPassword").innerText = "La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una minúscula, un número y un carácter especial.";
        return false;
    } else {
        e.target.classList.remove("resaltado");
        document.getElementById("errorPassword").innerText = "";
        return true;
    }
}

// Repetir Password: Comprobar que coincide con password.
function validarRepetirPassword(e) {
    const password = document.getElementById("password").value;
    const passwordRepetida = e.target.value;

    if (password !== passwordRepetida) {
        e.target.classList.add("resaltado");
        document.getElementById("errorRepetirPassword").innerText = "Las contraseñas no coinciden.";
        return false;
    } else {
        e.target.classList.remove("resaltado");
        document.getElementById("errorRepetirPassword").innerText = "";
        return true;
    }
}

// Acepto las condiciones: Comprobar que está marcado al enviar.
function validarCondiciones(e) {
    const condiciones = document.getElementById("condiciones");

    if (!condiciones.checked) {
        e.target.classList.add("resaltado");
        document.getElementById("errorCondiciones").innerText = "Debes aceptar las condiciones.";
        return false;
    } else {
        e.target.classList.remove("resaltado");
        document.getElementById("errorCondiciones").innerText = "";
        return true;
    }
}