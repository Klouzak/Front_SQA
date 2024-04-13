export class Usuario {

    Usuario() {
        this.nombre = " ";
        this.apellido = " ";
        this.cedula = " ";
        this.telefono = " ";
        this.correo = " ";
        this.contraseña = " ";
        this.fechaNacimiento = " ";
        this.tipo = " ";
    }

    contructor(nombre, apellido, cedula, telefono, correo, fechaNacimiento, contraseña, tipo) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.cedula = cedula;
        this.telefono = telefono;
        this.correo = correo;
        this.fechaNacimiento = fechaNacimiento;
        this.contraseña = contraseña;
        this.tipo = tipo;
    }

}



