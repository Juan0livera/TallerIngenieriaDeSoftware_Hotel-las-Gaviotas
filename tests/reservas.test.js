const reservas = require("../src/core/reservas");

test("muestra un error cuando el nombre es vacío", function () { 
    const reserva = { 
        nombreCompleto: "", 
        telefono: "099123456", 
        email: "juan@gmail.com", 
        cantidadHuespedes: 1, 
        fechaIngreso: "", 
        fechaSalida: "" }; 
    const errores = reservas.validarReserva(reserva); 
    expect(errores.nombreCompleto).toBe( "El nombre completo es obligatorio." ); 
});

test("muestra un error cuando el teléfono es inválido", function () { 
    const reserva = { 
        nombreCompleto: "Juan Pérez", 
        telefono: "12345678", 
        email: "juan@gmail.com", 
        cantidadHuespedes: 1, 
        fechaIngreso: "", 
        fechaSalida: "" }; 
    const errores = reservas.validarReserva(reserva); 
    expect(errores.telefono).toBe( "El teléfono debe tener el formato 09XNNNNNN." ); 
});

test("muestra un error cuando el teléfono es inválido", function () { 
    const reserva = { 
        nombreCompleto: "Juan Pérez", 
        telefono: "", 
        email: "juan@gmail.com", 
        cantidadHuespedes: 1, 
        fechaIngreso: "", 
        fechaSalida: "" }; 
    const errores = reservas.validarReserva(reserva); 
    expect(errores.telefono).toBe( "El teléfono es obligatorio." ); 
});

test("muestra un error cuando el correo es inválido", function () { 
    const reserva = { 
        nombreCompleto: "Juan Pérez", 
        telefono: "099123456", 
        email: "juan.com", 
        cantidadHuespedes: 1, 
        fechaIngreso: "", 
        fechaSalida: "" }; 
    const errores = reservas.validarReserva(reserva); expect(errores.email).toBe( "El correo electrónico no tiene un formato válido." ); 
});

test("muestra un error cuando la cantidad de huéspedes es inválida", function () { 
    const reserva = { 
        nombreCompleto: "Juan Pérez", 
        telefono: "099123456", 
        email: "juan@gmail.com", 
        cantidadHuespedes: -5, 
        fechaIngreso: "", 
        fechaSalida: "" }; 
    const errores = reservas.validarReserva(reserva); 
    expect(errores.cantidadHuespedes).toBe( "La cantidad de huéspedes debe ser mayor que cero." ); 
});

test("muestra un error cuando la fecha de ingreso es anterior a hoy", function () { 
    const reserva = { 
        nombreCompleto: "Juan Pérez", 
        telefono: "099123456", 
        email: "juan@gmail.com", 
        cantidadHuespedes: 1, 
        fechaIngreso: "2026-07-01", 
        fechaSalida: "" }; 
    const errores = reservas.validarReserva(reserva); 
    expect(errores.fechaIngreso).toBe( "La fecha de ingreso no puede ser anterior a la fecha actual."); 
});

test("muestra un error cuando la fecha de salida es anterior a fecha de ingreso", function () { 
    const reserva = { 
        nombreCompleto: "Juan Pérez", 
        telefono: "099123456", 
        email: "juan@gmail.com", 
        cantidadHuespedes: 1, 
        fechaIngreso: "2026-07-30", 
        fechaSalida: "2026-07-28" }; 
    const errores = reservas.validarReserva(reserva); 
    expect(errores.fechaSalida).toBe( "La fecha de salida debe ser posterior a la fecha de ingreso."); 
});



