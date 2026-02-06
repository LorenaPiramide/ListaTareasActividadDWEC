// En él debemos implementar las funciones que realizan las peticiones HTTP con la API JSON-server que realizará las funciones de servidor.
import { URL_SERVER } from './constantes.js';

export function login(email, password) {
    return fetch(`${URL_SERVER}usuarios?email=${encodeURIComponent(email)}`)
        .then(res => {
            if (!res.ok) throw new Error("No se pudo conectar con el servidor");
            return res.json();
        })
        .then(users => {
            if (users.length === 0) throw new Error("Usuario no encontrado");
            const user = users[0];
            if (user.password !== password) throw new Error("Contraseña incorrecta");
            return { id: user.id, email: user.email };
        });
}

export function registro(usuario) {
    return fetch(URL_SERVER + "usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario)
    }).then(res => {
        if (!res.ok) throw new Error("Error en registro");
        return res.json();
    });
}

export function obtenerTareasUsuario(idUser) {
    return fetch(`${URL_SERVER}tareas?id_user=${idUser}`)
        .then(res => res.json());
}

export function crearTarea(tarea) {
    return fetch(`${URL_SERVER}tareas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tarea)
    }).then(res => res.json());
}

export function actualizarTarea(tarea) {
    return fetch(`${URL_SERVER}tareas/${tarea.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tarea)
    }).then(res => res.json());
}

export function eliminarTarea(id) {
    return fetch(`${URL_SERVER}tareas/${id}`, {
        method: "DELETE"
    }).then(res => res.ok ? res : Promise.reject());
}
