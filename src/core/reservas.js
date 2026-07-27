class Usuario {
    constructor(usuario, contrasenia) {
        this.usuario = usuario;
        this.contrasenia = contrasenia;
    }
}

class Reserva {
    constructor(nombre, telefono, email, fechaIngreso, fechaSalida, tipoHabitacion, categoria, huespedes, titular, tarjeta, vencimiento, cvv) {
        this.nombre = nombre;
        this.telefono = telefono;
        this.email = email;
        this.fechaIngreso = fechaIngreso;
        this.fechaSalida = fechaSalida;
        this.tipoHabitacion = tipoHabitacion;
        this.categoria = categoria;
        this.huespedes = huespedes;

        //recibimos estos datos pero no resrevamos en localstorage
        this.titular = titular;
        this.tarjeta = tarjeta;
        this.vencimiento = vencimiento;
        this.cvv = cvv;
    }
}

class Sistema {
    constructor() {
        this.listaUsuarios = [];
        this.listaReservas = [];

        this.listaUsuarios.push(new Usuario("admin", "hotel"));
    }

    login(usuarioIngresado, contraseniaIngresada) {
        let valido = false;
        let i = 0;

        while (!valido && i < this.listaUsuarios.length) {
            let usuario = this.listaUsuarios[i];

            if (usuario.usuario === usuarioIngresado &&
                usuario.contrasenia === contraseniaIngresada) {
                valido = true;
            }

            i++;
        }

        return valido;
    }

    cargarTablaReservas() {

    let tabla = `
        <table class="tabla-reservas">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Ingreso</th>
                    <th>Salida</th>
                    <th>Habitación</th>
                    <th>Categoría</th>
                    <th>Huéspedes</th>
                </tr>
            </thead>
            <tbody>
    `;

    if (this.listaReservas.length === 0) {
        tabla += `
            <tr>
                <td colspan="7">No hay reservas registradas</td>
            </tr>
        `;
    }
    else {
        for (let reserva of this.listaReservas) {
            tabla += `
                <tr>
                    <td>${reserva.nombre}</td>
                    <td>${reserva.email}</td>
                    <td>${reserva.fechaIngreso}</td>
                    <td>${reserva.fechaSalida}</td>
                    <td>${reserva.tipoHabitacion}</td>
                    <td>${reserva.categoria}</td>
                    <td>${reserva.huespedes}</td>
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



    
}

