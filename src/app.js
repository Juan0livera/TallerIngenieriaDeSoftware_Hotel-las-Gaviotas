import { Reserva, validarReserva } from "./core/reservas.js";
import { login, validarCamposLogin } from "./core/login.js";

// para tenerlas en memoria
let listaReservas = cargarReservasDesdeLocalStorage();


// EVENTOS -----------------
function eventos() {
    let btnIngresar = document.querySelector("#btnIngresar");

    let btnReservar = document.querySelector("#btnReservar");

    let btnLogout = document.querySelector("#btnLogout");

    if (btnReservar) {
        btnReservar.addEventListener("click", reservar);
    }

    if (btnIngresar) {
        btnIngresar.addEventListener("click", loginUI);
    }

    if (btnLogout) {
        btnLogout.addEventListener("click", logout);
    }
}

// login -----------------
function loginUI() {
    let usuario = document.querySelector("#usuario").value.trim();
    let contrasenia = document.querySelector("#password").value.trim();

    let mensaje = validarCamposLogin(usuario, contrasenia);

    if (mensaje !== "") {
        document.querySelector("#errorLogin").textContent = mensaje;
        return;
    }

    if (login(usuario, contrasenia)) {
        localStorage.setItem("logueado", "true");
        location.href = "listado.html";
    } else {
        document.querySelector("#errorLogin").textContent =
            "Nombre o contraseña incorrecta";
    }
}

function logout() {
    localStorage.removeItem("logueado");
    location.href = "login.html";
}

if (window.location.href.includes("listado.html")) {
    if (localStorage.getItem("logueado") !== "true") {
        location.href = "login.html";
    }
}


// Reservas -----------------

function reservar(evento) {

    evento.preventDefault(); // para evitar envio tradicional del form como pide la documentacion

    limpiarErroresReserva();
    let nuevaReserva = obtenerDatosReserva();
    let errores = validarReserva(nuevaReserva);

    if (Object.keys(errores).length > 0) {
        mostrarErroresReserva(errores);
        return;
    }

    listaReservas.push(nuevaReserva);
    guardarReservasEnLocalStorage();
    document.querySelector("#reservationForm").reset();

    mostrarResumenReserva(nuevaReserva); 

}

function obtenerDatosReserva() {

    let nombreCompleto = document.querySelector("#nombreCompleto").value.trim();
    let telefono = document.querySelector("#telefono").value.trim();
    let email = document.querySelector("#email").value.trim();
    let fechaIngreso = document.querySelector("#fechaIngreso").value.trim();
    let fechaSalida = document.querySelector("#fechaSalida").value;
    let categoriaHabitacion = document.querySelector("#categoriaHabitacion").value;
    let cantidadHuespedes = document.querySelector("#cantidadHuespedes").value;


    let comentarios =
        document.querySelector("#comentarios").value.trim();

    let serviciosAdicionales = Array.from(
        document.querySelectorAll(
            'input[name="serviciosAdicionales"]:checked'
        )
    ).map(servicio => servicio.value);

    return new Reserva(
        nombreCompleto,
        telefono,
        email,
        categoriaHabitacion,
        cantidadHuespedes,
        fechaIngreso,
        fechaSalida,
        serviciosAdicionales,
        comentarios
    );
}

function mostrarErroresReserva(errores) {
    let contenedorErrores = document.querySelector("#erroresReserva");

    let listaErrores = Object.values(errores);

    let html = "<ul>";

    for (let error of listaErrores) {
        html += `<li>${error}</li>`;
    }

    html += "</ul>";

    contenedorErrores.innerHTML = html;
    contenedorErrores.hidden = false;
}

function mostrarResumenReserva(reserva) {
    let resumen = document.querySelector("#resumenReserva");

    document.querySelector("#resumenNombre").textContent =
        reserva.nombreCompleto;

    document.querySelector("#resumenCategoria").textContent =
        reserva.categoriaHabitacion;

    document.querySelector("#resumenHuespedes").textContent =
        reserva.cantidadHuespedes;

    document.querySelector("#resumenIngreso").textContent =
        reserva.fechaIngreso;

    document.querySelector("#resumenSalida").textContent =
        reserva.fechaSalida;

    document.querySelector("#resumenServicios").textContent =
        reserva.serviciosAdicionales.length > 0
            ? reserva.serviciosAdicionales.join(", ")
            : "Ninguno";

    resumen.hidden = false;
}

// manejo de lista y guardado en localstorage
function cargarReservasDesdeLocalStorage() {
    let reservasJSON = localStorage.getItem("reservas");

    if (reservasJSON === null) {
        return [];
    }

    return JSON.parse(reservasJSON);
}

function guardarReservasEnLocalStorage() {
    let reservasJSON = JSON.stringify(listaReservas);

    localStorage.setItem("reservas", reservasJSON);
}


function limpiarErroresReserva() {
    let contenedorErrores = document.querySelector("#erroresReserva");

    contenedorErrores.innerHTML = "";
    contenedorErrores.hidden = true;
}

//listado
function mostrarReservas() {

    let lista = document.querySelector("#listaReservas");

    if (lista) {
        lista.innerHTML = construirTablaReservas();
    }

}

function construirTablaReservas() {
    let tabla = `
        <table class="tabla-reservas">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Teléfono</th>
                    <th>Email</th>
                    <th>Ingreso</th>
                    <th>Salida</th>
                    <th>Categoría</th>
                    <th>Huéspedes</th>
                    <th>Servicios</th>
                    <th>Comentarios</th>
                </tr>
            </thead>

            <tbody>
    `;

    if (listaReservas.length === 0) {
        tabla += `
            <tr>
                <td colspan="9">
                    No hay reservas registradas
                </td>
            </tr>
        `;
    } else {
        for (let reserva of listaReservas) {
            let servicios = "Ninguno";

            if (
                Array.isArray(reserva.serviciosAdicionales) &&
                reserva.serviciosAdicionales.length > 0
            ) {
                servicios = reserva.serviciosAdicionales.join(", ");
            }

            let comentarios =
                reserva.comentarios !== ""
                    ? reserva.comentarios
                    : "Sin comentarios";

            tabla += `
                <tr>
                    <td data-label="Nombre">
                        ${reserva.nombreCompleto}
                    </td>

                    <td data-label="Teléfono">
                        ${reserva.telefono}
                    </td>

                    <td data-label="Email">
                        ${reserva.email}
                    </td>

                    <td data-label="Ingreso">
                        ${reserva.fechaIngreso}
                    </td>

                    <td data-label="Salida">
                        ${reserva.fechaSalida}
                    </td>

                    <td data-label="Categoría">
                        ${reserva.categoriaHabitacion}
                    </td>

                    <td data-label="Huéspedes">
                        ${reserva.cantidadHuespedes}
                    </td>

                    <td data-label="Servicios">
                        ${servicios}
                    </td>

                    <td data-label="Comentarios">
                        ${comentarios}
                    </td>
                </tr>
            `;
        }
    }

    tabla += `
            </tbody>
        </table>
    `;

    return tabla;
}


document.addEventListener("DOMContentLoaded", function () {

    eventos();
    mostrarReservas();
});