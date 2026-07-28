let miApp = new Sistema();

function eventos() {
    let btnIngresar = document.querySelector("#btnIngresar");

    let btnReservar = document.querySelector("#btnReservar");

    if(btnReservar){
        btnReservar.addEventListener("click", reservar);
    }

    if (btnIngresar) {
        btnIngresar.addEventListener("click", loginUI);
    }
}

// eventos();

function loginUI() {
    let mensaje = "";

    let usuario = document.querySelector("#usuario").value;
    let contrasenia = document.querySelector("#password").value;

    if (miApp.login(usuario, contrasenia)) {
        localStorage.setItem("logueado", "true");
        location.href = "listado.html";
    }
    else {
        mensaje = "Nombre o contraseña incorrecta";
    }

    document.querySelector("#errorLogin").innerHTML = mensaje;
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

function mostrarReservas() {

    let lista = document.querySelector("#listaReservas");

    if (lista) {
        lista.innerHTML = miApp.cargarTablaReservas();
    }

}


function reservar (){
    let nombre = document.querySelector("#nombre").value.trim();
    let telefono = document.querySelector("#telefono").value.trim();
    let email = document.querySelector("#email").value.trim();
    let fechaIngreso = document.querySelector("#fechaIngreso").value.trim();
    let fechaSalida = document.querySelector("#fechaSalida").value;
    let tipoHabitacion = document.querySelector("#tipoHabitacion").value;
    let categoria = document.querySelector("#categoria").value;
    let huespedes = document.querySelector("#huespedes").value;
    let titular = document.querySelector("#titular").value.trim();
    let tarjeta = document.querySelector("#tarjeta").value.trim();
    let vencimiento = document.querySelector("#vencimiento").value.trim();
    let cvv = document.querySelector("#cvv").value.trim();

   //let mensaje = document.querySelector("#mensajeReserva");


    if (
        nombre === "" ||
        telefono === "" ||
        email === "" ||
        fechaIngreso === "" ||
        fechaSalida === "" ||
        tipoHabitacion === "" ||
        categoria === "" ||
        huespedes <= 0 ||
        titular === "" ||
        tarjeta === "" ||
        vencimiento === "" ||
        cvv === ""
    ) {

        // mensaje.textContent = "Debe completar los campos.";
        return;
    }

    if(new Date(fechaSalida) <= new Date(fechaIngreso)){
        // mensaje.textContent =
        //     "La fecha de salida debe ser posterior a la fecha de ingreso";
        return;
    }

    let nuevaReserva = new Reserva(
        nombre, 
        telefono,
        email,
        fechaIngreso,
        fechaSalida,
        tipoHabitacion,
        categoria,
        huespedes,
        titular,
        tarjeta,
        vencimiento,
        cvv
    );

    miApp.agregarReserva(nuevaReserva);

    //mensaje.textContent = "La reserva se realizó correctamente";

    //document.querySelector("#reservationForm").rest();

    console.log("Reserva agregada:");
    console.log(nuevaReserva);

    console.log("Lista completa:");
    console.table(miApp.listaReservas);
    
}

document.addEventListener("DOMContentLoaded", function () {
    //controlarAcceso();
    eventos();
    mostrarReservas();
});