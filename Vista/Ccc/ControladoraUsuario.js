import { Usuario } from '../Modelo/Usuario.mjs';


export class ControladoraUsuario {

    // --------------- LOGUEO ----------------------
    async logeo(correo, contraseña) {
        await fetch('https://sqa-kcgp.onrender.com/Login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    // Agrega los datos del joven que deseas enviar en la solicitud,
                    Contraseña: contraseña,
                    Correo: correo,
                })
            }).then(response => response.json())
            .then(data => {

                if (data.valid === true) {
                    window.location.assign('/Principal.html')

                    document.cookie = `Nombre=${data.nombres}; expires=Fri, 31 Dec 2024 23:59:59 UTC; path=/`;
                    document.cookie = `Apellido=${data.apellidos}; expires=Fri, 31 Dec 2024 23:59:59 UTC; path=/`;
                    document.cookie = `Id=${data.Ids}; expires=Fri, 31 Dec 2024 23:59:59 UTC; path=/`;
                    document.cookie = `Roll=${data.Tipo}; expires=Fri, 31 Dec 2024 23:59:59 UTC; path=/`;

                } else {
                    alert("Error al ingresar datos")
                } {}
            })
            .catch(error => {
                e
                // alert('Error al agregar el joven:', error);  
            });
    }

    async VisualizarUsuarios(table, valid, id) {
        fetch('https://sqa-kcgp.onrender.com/Usuario/buscarDatosModificarOEliminar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    // Agrega los datos del joven que deseas enviar en la solicitud,
                    Id: id,
                })
            })
            .then(response => response.json())
            .then(data => {
                let i = 0;
                let numero = data.Cantidad;

                do {
                    // Obtener los datos de la fila (nombre, apellido, cédula, fecha)
                    let nombre = data.nombres[i];
                    let apellido = data.apellidos[i];
                    let cedula = data.Cedulas[i];
                    let tipo = data.Tipo[i];
                    let correo = data.Correos[i]


                    // Crear una nueva fila
                    const newRow = table.insertRow();

                    // Agregar las celdas a la fila
                    const cell1 = newRow.insertCell(0);
                    const cell2 = newRow.insertCell(1);
                    const cell3 = newRow.insertCell(2);
                    const cell4 = newRow.insertCell(3);
                    const cell5 = newRow.insertCell(4);
                    const cell6 = newRow.insertCell(5);

                    // Establecer el contenido de las celdas
                    cell1.innerHTML = i;
                    cell2.innerHTML = nombre;
                    cell3.innerHTML = apellido;
                    cell4.innerHTML = cedula;
                    cell5.innerHTML = tipo;
                    cell6.innerHTML = correo;

                    cell6.classList.add("invisible-column");

                    newRow.addEventListener('click', function() {
                        // Obtener los datos de la fila clickeada
                        var cells = this.getElementsByTagName('td');
                        const rowData = [];
                        let CC = new ControladoraUsuario()

                        for (var j = 0; j < cells.length; j++) {
                            rowData.push(cells[j].innerText);
                        }
                        CC.BuscarDatosDeUnUsuarioPorCedula(rowData[3], valid)
                    });


                    i++;
                } while (i != numero);
            })
            .catch(error => {
                console.error('Error al llenar la tabla', error);
            });
    }

    async BuscarDatosDeUnUsuarioPorCedula(cedula, valid) {
        fetch('https://sqa-kcgp.onrender.com/Usuario/buscarDatosDeUsuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Cedula: cedula
                })
            }).then(response => response.json())
            .then(data => {
                this.LLenarCamposDeTextoDeEliminarJovenes(data, valid)
            })
            .catch(error => {
                console.error('Error buscar datos por cedula', error);
            });
    }

    LLenarCamposDeTextoDeEliminarJovenes(data, valid) {

        let campoTextoNombre = document.getElementById("inputName5");
        campoTextoNombre.value = data.nombres;

        let campoTextoApellido = document.getElementById("inputLastName5");
        campoTextoApellido.value = data.apellidos

        let campoTextoCorreo = document.getElementById("inputEmail5")
        campoTextoCorreo.value = data.Correos

        let campoTextoFechaDeNacimiento = document.getElementById("inputFecha5")
        campoTextoFechaDeNacimiento.value = data.FechaNacimiento

        let campoTextoCedula = document.getElementById("inputCedula5")
        campoTextoCedula.value = data.Cedulas

        let campoTextoTelefono = document.getElementById("inputTelefono5")
        campoTextoTelefono.value = data.Telefonos

        if (valid == 1) document.getElementById("inputPassword5").value = data.password

        document.getElementById("inputDescripcion5").value = data.Descripcion

        let CampoEstaticoDeVelorCedula = document.getElementById('Cedula')
        CampoEstaticoDeVelorCedula.value = data.Cedulas;

        let CampoEstaticoDeCorreo = document.getElementById('Correo')
        CampoEstaticoDeCorreo.value = data.Correos

        if (data.Tipo == 'Administrador') {
            var radioInput = document.getElementById('checkAdmin');

            radioInput.checked = true;
        } else {
            var radioInput = document.getElementById('checkColab');

            // Activar el radio button
            radioInput.checked = true
        }

        console.log(CampoEstaticoDeCorreo.value)
    }

    // --------------- TABLAS ----------------------////
    async MostrarUsuariosIndex(table) {
        fetch('https://sqa-kcgp.onrender.com/Usuario', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => response.json())
            .then(data => {
                let i = 0;
                let numero = data.Cantidad;

                do {
                    // Obtener los datos de la fila (nombre, apellido, cédula, fecha)
                    let nombre = data.nombres[i];
                    let apellido = data.apellidos[i];
                    let cedula = data.Cedulas[i];
                    let tipo = data.Tipo[i];

                    // Crear una nueva fila
                    const newRow = table.insertRow();

                    // Agregar las celdas a la fila
                    const cell1 = newRow.insertCell(0);
                    const cell2 = newRow.insertCell(1);
                    const cell3 = newRow.insertCell(2);
                    const cell4 = newRow.insertCell(3);
                    const cell5 = newRow.insertCell(4);

                    // Establecer el contenido de las celdas
                    cell1.innerHTML = i;
                    cell2.innerHTML = nombre;
                    cell3.innerHTML = apellido;
                    cell4.innerHTML = cedula;
                    cell5.innerHTML = tipo;

                    i++;
                } while (i != numero);
            })
            .catch(error => {
                console.error('Error al llenar tabla usuarios', error);
            });
    }

    async MostrarUsuarios(table) {
        fetch('https://sqa-kcgp.onrender.com/Usuario', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => response.json())
            .then(data => {
                let i = 0;
                let numero = data.Cantidad;

                do {
                    // Obtener los datos de la fila (nombre, apellido, cédula, fecha)
                    let nombre = data.nombres[i];
                    let apellido = data.apellidos[i];
                    let cedula = data.Cedulas[i];
                    let tipo = data.Tipo[i];
                    let telefono = data.Telefonos[i]

                    // Crear una nueva fila
                    const newRow = table.insertRow();

                    // Agregar las celdas a la fila
                    const cell1 = newRow.insertCell(0);
                    const cell2 = newRow.insertCell(1);
                    const cell3 = newRow.insertCell(2);
                    const cell4 = newRow.insertCell(3);
                    const cell5 = newRow.insertCell(4);
                    const cell6 = newRow.insertCell(5);

                    // Establecer el contenido de las celdas
                    cell1.innerHTML = i;
                    cell2.innerHTML = nombre;
                    cell3.innerHTML = apellido;
                    cell4.innerHTML = cedula;
                    cell5.innerHTML = tipo;
                    cell6.innerHTML = telefono;

                    i++;
                } while (i != numero);
            })
            .catch(error => {
                console.error('Error al mostrar usuarios: ', error);
            });
    }

    // --------------- Usuario ----------------------
    async ModificarUsuarioBase(nombre, apellido, cedula, correo, cedulaTabla, telefono, fechaNacimiento, password, descripcion, tipo) {

        await fetch('https://sqa-kcgp.onrender.com/Usuario/modificarUsuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Nombre: nombre,
                    Apellido: apellido,
                    Cedula: cedula,
                    Correo: correo,
                    CedulaTabla: cedulaTabla,
                    Telefono: telefono,
                    Fecha_de_nacimiento: fechaNacimiento,
                    Password: password,
                    Tipo: tipo,
                    Descripcion: descripcion,
                })
            })
            .then(response => response.json())
            .then(data => {
                alert("Usuario modificado con éxito");
            })
            .catch(error => {
                // alert('Error al modificar el usuario: ', error);
            });
    }

    async ModificarUsuario(nombre, apellido, cedula, correo, cedulaTabla, telefono, fechaNacimiento, password, descripcion, correoTabla, tipo) {
        const val = await this.validacionUsuario(nombre, apellido, cedula, correo, cedulaTabla, telefono, fechaNacimiento, password, descripcion, correoTabla, tipo);

        if (val == true) {
            this.ModificarUsuarioBase(nombre, apellido, cedula, correo, cedulaTabla, telefono, fechaNacimiento, password, descripcion, tipo);
            location.reload();
        }
    }

    async EliminarUsuario(cedula) {

        fetch('https://sqa-kcgp.onrender.com/Usuario/eliminarUsuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Cedula: cedula
                })
            })
            .then(response => response.json())
            .then(data => {
                alert("Usuario eliminado con éxito");
            })
            .catch(error => {
                //alert('Error al eliminar el usuario:', error);
            });
    }

    async AgregarUsuarioBase(nombre, apellido, cedula, correo, telefono, fechaNacimiento, password, descripcion, Tipo) {

        fetch('https://sqa-kcgp.onrender.com/Usuario/AgregarUsuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Nombre: nombre,
                    Apellido: apellido,
                    Cedula: cedula,
                    Correo: correo,
                    Telefono: telefono,
                    Fecha_de_nacimiento: fechaNacimiento,
                    Password: password,
                    Descripcion: descripcion,
                    Tipo: Tipo
                })
            })
            .then(response => response.json())
            .then(data => {
                alert("Usuario agregado con éxito");
            })
            .catch(error => {
                //alert('Error al agregar el Usuario: ', error);
            });
    }


    async validacionUsuario(Nombre, Apellido, Cedula, Correo, cedulaTabla, Telefono, FNacimiento, Contraseña, descripcion, correoTabla, Tipo) {
        debugger
        var isValid = true;
        const fechaActual = new Date();
        const fechaActualYear = fechaActual.getFullYear();

        const fechaCampo = FNacimiento
        const fechaCampoYear = new Date(fechaCampo).getFullYear();


        if (Nombre == "" || Apellido == "" || Correo == "" || Cedula == "" || Telefono == "" || FNacimiento == "" || Contraseña == "" || Tipo == ' ') {
            isValid = false;
            alert("Por favor llenar todos los campos");
        } else {

            if (fechaCampoYear < 1950 || fechaCampoYear > 2008) {
                alert("La fecha de nacimiento debe estar entre 1950 y 2008.");
                isValid = false;
            } else if (fechaCampoYear === fechaActualYear) {
                alert("La fecha de nacimiento ingresada es igual al año actual debe estar entre 1950 y 2008.");
                isValid = false;
            } else if (fechaCampoYear > fechaActualYear) {
                alert("La fecha ingresada es posterior al año actual, debe estar entre 1950 y 2008.");
                isValid = false;
            }


            var re = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/;
            if (!re.test(Correo)) {
                isValid = false;
            }

            var regexCedula = /^(5\d{6}|[1-2]\d{7}|3[0-4]\d{6})$/;
            if (!regexCedula.test(Cedula)) {
                isValid = false;
            }

            var reg = /^[a-zA-ZáéíóúüÁÉÍÓÚÜñÑ\s]+$/;
            if (!reg.test(Nombre) || !reg.test(Apellido)) {
                isValid = false;
            }

            var regexDesc = /^[a-zA-ZáéíóúüÁÉÍÓÚÜñÑ\s]+$/
            if (!regexDesc.test(descripcion)) {
                isValid = false;
            }

            var regex = /^0(414|412|424|416|426|02\d)-\d{7}$/;
            if (regex.test(Telefono) == false) {
                isValid = false;
            }

            var regexPassword = /^(?=.*\d)(?=.*\W).{7,15}$/;
            if (!regexPassword.test(Contraseña)) {
                isValid = false;
            }

            var resultadoValidacion = await this.ValidarCedula(Cedula);
            if ((resultadoValidacion != 0) && (resultadoValidacion != cedulaTabla)) {
                alert("Esa cédula ya se encuentra registrada");
                isValid = false;
            }

            var resultadoVal = await this.ValidarCorreo(Correo);
            if ((resultadoVal != 0) && (resultadoVal != correoTabla)) {
                alert("Ese correo ya se encuentra registrado");
                isValid = false;
            }


        }

        if (isValid) {
            setTimeout(function() {
                location.reload();
            }, 1500);
        }

        return isValid;
    }

    async AgregarUsuario(nombre, apellido, cedula, correo, telefono, fechaNacimiento, password, descripcion, Tipo) {

        const val = await this.validacionUsuario(nombre, apellido, cedula, correo, 1, telefono, fechaNacimiento, password, descripcion, 1, Tipo);

        if (val == true) {
            this.AgregarUsuarioBase(nombre, apellido, cedula, correo, telefono, fechaNacimiento, password, descripcion, Tipo);
            location.reload();
        }

    }

    async ValidarCedula(cedula) {
        var x = true;
        await fetch('https://sqa-kcgp.onrender.com/Usuario/validarCedula', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Cedula: cedula,
                })
            })
            .then(response => response.json())
            .then(data => {
                x = data;
            })
            .catch(error => {
                console.error('Error al validar la cedula', error);
            });
        return x;
    }

    async ValidarCorreo(correo) {
        var x = true;
        await fetch('https://sqa-kcgp.onrender.com/Usuario/validarCorreo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Correo: correo,
                })
            })
            .then(response => response.json())
            .then(data => {
                x = data;
            })
            .catch(error => {
                console.error('Error al validar el correo', error);
            });
        return x;
    }

    // --------------- Metodos para el Perfil ----------------------

    async BuscarDatosPerfil(ID) {
        await fetch('https://sqa-kcgp.onrender.com/Usuario/buscarDatosPerfil', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Id: ID
                })
            })
            .then(response => response.json())
            .then(data => {
                this.LLenarCamposDeTextoPerfil(data)
            })
            .catch(error => {
                console.error('Error', error);
            });
    }

    async BuscarDatos(ID) {
        var d = "";
        await fetch('https://sqa-kcgp.onrender.com/Usuario/buscarDatosPerfil', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Id: ID
                })
            })
            .then(response => response.json())
            .then(data => {
                d = data;
            })
            .catch(error => {
                console.error('Error', error);
            });
        return d;
    }

    async ModificarPerfil(id, nombre, apellido, cedula, correo, telefono, fechaNacimiento, descripcion) {

        var data = await this.BuscarDatos(id);

        const val = await this.validacionUsuario(nombre, apellido, cedula, correo, data.Cedulas, telefono, fechaNacimiento, "abc12345678.", descripcion, data.Correos, data.tipo);

        if (val == true) {
            this.ModificarPerfilBase(id, nombre, apellido, cedula, correo, telefono, fechaNacimiento, descripcion);
        }
    }

    async ModificarPerfilBase(id, nombre, apellido, cedula, correo, telefono, fechaNacimiento, descripcion) {

        await fetch('https://sqa-kcgp.onrender.com/Usuario/ModificarPerfil', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Id: id,
                    Nombre: nombre,
                    Apellido: apellido,
                    Cedula: cedula,
                    Correo: correo,
                    Telefono: telefono,
                    Fecha_de_nacimiento: fechaNacimiento,
                    Descripcion: descripcion,
                })
            })
            .then(response => response.json())
            .then(data => {
                this.BuscarDatosPerfil(id)

            })
            .catch(error => {
                //alert('Error al modificar el usuario:', error);
            });
    }



    LLenarCamposDeTextoPerfil(data) {
        document.getElementById('descripcion').value = data.Descripcion
        document.getElementById('nombre').value = data.nombres;
        document.getElementById('apellido').value = data.apellidos
        document.getElementById('cedula').value = data.Cedulas
        document.getElementById('fechadeNacimiento').value = data.FechaNacimiento
        document.getElementById('correo').value = data.Correos
        document.getElementById('telefono').value = data.Telefono

        document.getElementById("nombreEstatico").innerText = data.nombres;
        document.getElementById('descripciónEstatica').textContent = data.Descripcion
        document.getElementById('correoEstatico').innerText = data.Correos
        document.getElementById('apellidoEstatico').innerText = data.apellidos
        document.getElementById('cedulaEstatica').innerText = data.Cedulas
        document.getElementById('fechadeNacimientoEstatica').innerText = data.FechaNacimiento
        document.getElementById('telefonoEstatico').innerText = data.Telefono
    }


    async CambiarPassword(password, newPassword, renewPassword, id) {

        await fetch('https://sqa-kcgp.onrender.com/Usuario/cambiarPassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Password: password,
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data && newPassword == renewPassword) {
                    this.ValidarPassword(newPassword, id);

                    location.reload()

                } else if (data == false) alert("La contraseña actual ingresada es invalida")
                else if (newPassword != renewPassword) alert("Las contraseñas nuevas no coinciden")
            })
            .catch(error => {
                console.error('Error al modificar la contraseña:', error);
            });
    }


    async ValidarPassword(newPassword, id) {
        await fetch('https://sqa-kcgp.onrender.com/Usuario/modificarPassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Password: newPassword,
                    Id: id,
                })
            })
            .then(response => response.json())
            .then(data => {
                alert("Se ha modificado la contraseña de manera exitosa!");
            })
            .catch(error => {
                // alert('Error al modificar la contraseña:', error);
            });
    }

    //////////// Consultar usuarios////////////

    async ConsultarTodosUsuarios(table) {
        fetch('https://sqa-kcgp.onrender.com/Usuario', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => response.json())
            .then(data => {
                let i = 0;
                let numero = data.Cantidad;

                do {
                    // Obtener los datos de la fila (nombre, apellido, cédula, fecha)
                    let nombre = data.nombres[i];
                    let apellido = data.apellidos[i];
                    let cedula = data.Cedulas[i];
                    let tipo = data.Tipo[i];
                    let telefono = data.Telefonos[i]
                    let correo = data.Correos[i]

                    // Crear una nueva fila
                    const newRow = table.insertRow();

                    // Agregar las celdas a la fila
                    const cell1 = newRow.insertCell(0);
                    const cell2 = newRow.insertCell(1);
                    const cell3 = newRow.insertCell(2);
                    const cell4 = newRow.insertCell(3);
                    const cell5 = newRow.insertCell(4);
                    const cell6 = newRow.insertCell(5);
                    const cell7 = newRow.insertCell(6)

                    // Establecer el contenido de las celdas
                    cell1.innerHTML = i;
                    cell2.innerHTML = nombre;
                    cell3.innerHTML = apellido;
                    cell4.innerHTML = cedula;
                    cell5.innerHTML = tipo;
                    cell6.innerHTML = telefono;
                    cell7.innerHTML = correo;


                    i++;
                } while (i != numero);
            })
            .catch(error => {
                console.error('Error al mostrar usuarios: ', error);
            });
    }





}