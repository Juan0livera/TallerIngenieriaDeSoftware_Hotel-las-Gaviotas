class Usuario {
    constructor(usuario, contrasenia) {
        this.usuario = usuario;
        this.contrasenia = contrasenia;
    }
}

let listaUsuarios = [];
listaUsuarios.push(new Usuario("admin", "hotel"));

function validarCamposLogin(usuario, contrasenia) {
    if (usuario === "" || contrasenia === "") {
        return "El usuario y la contraseña son campos obligatorios";
    }

    return "";
}

 function login(usuarioIngresado, contraseniaIngresada) {
    let valido = false;
    let i = 0;

    while (!valido && i < listaUsuarios.length) {
        let usuario = listaUsuarios[i];

        if (
            usuario.usuario === usuarioIngresado &&
            usuario.contrasenia === contraseniaIngresada
        ) {
            valido = true;
        }

        i++;
    }

    return valido;
}