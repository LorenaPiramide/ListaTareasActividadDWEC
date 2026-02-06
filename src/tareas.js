import { obtenerTareasUsuario, crearTarea, actualizarTarea, eliminarTarea } from "./peticiones.js";

document.addEventListener("DOMContentLoaded", () => {
    // Comprobar sesión
    const usuario = JSON.parse(sessionStorage.getItem("usuario"));
    if (!usuario || !usuario.id) {
        window.location.href = "index.html";
        return;
    }

    const lista = document.getElementById("listaTareas");
    const btnAddTask = document.getElementById("btnAddTask");
    const btnLogout = document.getElementById("btnLogout");

    function crearElementoTarea(t) {
        const li = document.createElement("li");
        li.dataset.id = t.id;

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = t.acabada;

        const span = document.createElement("span");
        span.textContent = t.nombre;

        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";

        checkbox.addEventListener("change", () => {
            const anterior = t.acabada;
            t.acabada = checkbox.checked;
            actualizarTarea(t).catch(() => {
                alert("Error al actualizar la tarea");
                t.acabada = anterior;
                checkbox.checked = anterior;
            });
        });

        btnEliminar.addEventListener("click", () => {
            eliminarTarea(t.id)
                .then(() => li.remove())
                .catch(() => alert("Error al eliminar la tarea"));
        });

        li.append(checkbox, span, btnEliminar);
        lista.appendChild(li);
    }

    obtenerTareasUsuario(usuario.id)
        .then(tareas => tareas.forEach(crearElementoTarea))
        .catch(err => console.error(err));

    btnAddTask.addEventListener("click", () => {
        // Formulario dinámico
        const form = document.createElement("div");

        const inputNombre = document.createElement("input");
        inputNombre.placeholder = "Nombre de la tarea";

        const inputAcabada = document.createElement("input");
        inputAcabada.type = "checkbox";

        const labelAcabada = document.createElement("label");
        labelAcabada.textContent = "Acabada";

        const btnGuardar = document.createElement("button");
        btnGuardar.textContent = "Guardar";

        form.append(inputNombre, inputAcabada, labelAcabada, btnGuardar);
        // parentNode = main. Pone el formulario justo después de la lista de tareas.
        lista.parentNode.insertBefore(form, lista.nextSibling);

        btnGuardar.addEventListener("click", () => {
            const nuevaTarea = {
                nombre: inputNombre.value.trim(),
                acabada: inputAcabada.checked,
                id_user: usuario.id
            };
            if (!nuevaTarea.nombre) return alert("El nombre es obligatorio");

            crearTarea(nuevaTarea)
                .then(t => {
                    crearElementoTarea(t); // añadir directamente
                    form.remove();
                })
                .catch(() => alert("Error al crear la tarea"));
        });
    });

    // Logout
    btnLogout.addEventListener("click", () => {
        sessionStorage.removeItem("usuario");
        window.location.href = "index.html";
    });
});
