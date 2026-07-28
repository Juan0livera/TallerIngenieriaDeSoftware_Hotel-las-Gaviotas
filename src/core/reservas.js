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
        this.cargarReservasDesdeLocalStorage();
    }

    agregarReserva(nuevaReserva) {
        this.listaReservas.push(nuevaReserva);
        this.guardarReservasEnLocalStorage();

    }

    guardarReservasEnLocalStorage() {
        let reservasJSON = JSON.stringify(this.listaReservas);
        localStorage.setItem("reservas", reservasJSON);
    }

    cargarReservasDesdeLocalStorage() {
        let reservasJSON = localStorage.getItem("reservas");

        if (reservasJSON !== null) {
            this.listaReservas = JSON.parse(reservasJSON);
        }
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
    } else {
        for (let reserva of this.listaReservas) {
            tabla += `
            <tr>
                <td data-label="Nombre">${reserva.nombre}</td>
                <td data-label="Email">${reserva.email}</td>
                <td data-label="Ingreso">${reserva.fechaIngreso}</td>
                <td data-label="Salida">${reserva.fechaSalida}</td>
                <td data-label="Habitación">${reserva.tipoHabitacion}</td>
                <td data-label="Categoría">${reserva.categoria}</td>
                <td data-label="Huéspedes">${reserva.huespedes}</td>
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

