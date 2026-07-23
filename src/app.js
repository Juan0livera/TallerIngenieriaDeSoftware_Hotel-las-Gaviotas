let miApp = new Sistema();

function eventos() {
    let btnIngresar = document.querySelector("#btnIngresar");

    if (btnIngresar) {
        btnIngresar.addEventListener("click", loginUI);
    }
}

eventos();

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

mostrarReservas();