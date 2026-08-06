


class Reserva {
    constructor(
        nombreCompleto,
        telefono,
        email,
        categoriaHabitacion,
        cantidadHuespedes,
        fechaIngreso,
        fechaSalida,
        serviciosAdicionales,
        comentarios
    ) {
        this.nombreCompleto = nombreCompleto;
        this.telefono = telefono;
        this.email = email;
        this.categoriaHabitacion = categoriaHabitacion;
        this.cantidadHuespedes = Number(cantidadHuespedes);
        this.fechaIngreso = fechaIngreso;
        this.fechaSalida = fechaSalida;
        this.serviciosAdicionales = serviciosAdicionales;
        this.comentarios = comentarios;
    }
}



function crearReserva(nombreCompleto, telefono, email, fechaIngreso, fechaSalida, categoriaHabitacion, cantidadHuespedes, comentarios, serviciosAdicionales) {

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
// validaciones de reserva

function validarReserva(reserva) {
    let errores = {};

    //nombre
    if (reserva.nombreCompleto.trim() === "") {
        errores.nombreCompleto = "El nombre completo es obligatorio.";
    } else if (!/^\p{L}+(?:\s+\p{L}+)*$/u.test(reserva.nombreCompleto.trim())) {
        errores.nombreCompleto = "El nombre completo no puede tener caracteres especiales.";
    }



    //tel
    if (reserva.telefono.trim() === "") {
        errores.telefono = "El teléfono es obligatorio.";
    } else if (!/^09\d{7}$/.test(reserva.telefono)) {
        errores.telefono =
            "El teléfono debe tener el formato 09XNNNNNN.";
    }

    //email
    if (reserva.email.trim() === "") {
        errores.email = "El correo electrónico es obligatorio.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(reserva.email)) {
        errores.email = "El correo electrónico no tiene un formato válido.";
    }

    //categoria habitacion
    if (reserva.categoriaHabitacion.trim() === "") {
        errores.categoriaHabitacion = "La categoría de habitación es obligatoria.";
    }

    //cant huespedes
    if (
        !Number.isInteger(reserva.cantidadHuespedes) ||
        reserva.cantidadHuespedes <= 0
    ) {
        errores.cantidadHuespedes =
            "La cantidad de huéspedes debe ser mayor que cero.";
    } else if (reserva.cantidadHuespedes >= 4) {
        errores.cantidadHuespedes =
            "La cantidad máxima permitida es de 3 huéspedes.";
    }

    //fechas
    if (reserva.fechaIngreso === "") {
        errores.fechaIngreso =
            "La fecha de ingreso es obligatoria.";
    } else if (fechaEsAnteriorAHoy(reserva.fechaIngreso)) {
        errores.fechaIngreso =
            "La fecha de ingreso no puede ser anterior a la fecha actual.";
    }

    if (reserva.fechaSalida === "") {
        errores.fechaSalida =
            "La fecha de salida es obligatoria.";
    } else if (
        reserva.fechaIngreso !== "" &&
        new Date(reserva.fechaSalida) <= new Date(reserva.fechaIngreso)
    ) {
        errores.fechaSalida =
            "La fecha de salida debe ser posterior a la fecha de ingreso.";
    }

    return errores;
}


//auxiliares
function fechaEsAnteriorAHoy(fechaIngreso) {
    let fechaSeleccionada = new Date(fechaIngreso + "T00:00:00");

    let hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    return fechaSeleccionada < hoy;
}


/* module.exports = { validarReserva }; */

if (typeof module !== "undefined" && module.exports) {
    // para jest usa modulo
    module.exports = {
        crearReserva,
        validarReserva
    };
} else {
    // para navegador se expporta con window
    window.crearReserva = crearReserva;
    window.validarReserva = validarReserva;
}


