import { ControladoraUsuario } from './ControladoraUsuario.js';
import { ControladoraJovenes } from './ControladoraJovenes.js';
import { ControladoraEventos } from './ControladoraEventos.js';
import { ControladoraDonaciones } from './ControladoraDonaciones.js';

////////////////// 

(function() {
    const controladoraJovenes = new ControladoraJovenes();
    const controladoraUsuario = new ControladoraUsuario();
    const controladoraEventos = new ControladoraEventos();
    const controladoraDonaciones = new ControladoraDonaciones()

    switch (document.body.id) {
        case 'index':
            document.addEventListener("DOMContentLoaded", function() {
                const botonLogin = document.querySelector("#botonLogin");

                botonLogin.addEventListener("click", function(evento) {
                    evento.preventDefault();
                    evento.stopPropagation();
                    const contenidoEmail = document.getElementById("yourUsername").value;
                    const contenidoPassword = document.getElementById("yourPassword").value;
                    controladoraUsuario.logeo(contenidoEmail, contenidoPassword);  
                });
            });
            break;
            //-------------------Funcion de logueo--------------------//
        case 'Principal':
            document.addEventListener('DOMContentLoaded', function() {
                const table = document.querySelector('.table');
                const tableUsuarios = document.querySelector('#tablaIndexUsuarios')
                controladoraUsuario.MostrarUsuariosIndex(tableUsuarios)
                controladoraJovenes.MostarJovenes(table);
            });
            break;
            //------------------- Consultar Joven ---------------------//
        case 'consultar-joven':
            document.addEventListener('DOMContentLoaded', function() {
                // Obtener la referencia de la tabla
                const table = document.querySelector('.table');
                const tableUsuarios = document.querySelector('#tablaIndexUsuarios')
                controladoraJovenes.ConsultarJovenes(table);
            });
            break;
            //------------------- Agregar Joven ---------------------//
        case 'agregar-joven':
            alert('hola')
            document.addEventListener("DOMContentLoaded", function() {
                const botonAgregarJoven = document.querySelector("#agregar-jovensito");
                botonAgregarJoven.addEventListener("click", function(event) {

                    const nombre = document.getElementById("nombreJoven").value;
                    const apellido = document.getElementById("apellidoJoven").value;
                    const cedula = document.getElementById("cedulaJoven").value;
                    const correo = document.getElementById("jovenCorreo").value;
                    const hobby = document.getElementById("hobbiesJoven").value;
                    const redes = document.getElementById("redesJoven").value;
                    const telefono = document.getElementById("numeroTelefonoJoven").value;
                    const fechaNacimiento = document.getElementById("fechaNacimiento").value;
                    var confirmar = confirm('Seguro que desea agregar?')
                    if (confirmar) {
                        controladoraJovenes.AgregarJoven(nombre, apellido, cedula, correo, redes, hobby, telefono, fechaNacimiento);
                    } else {
                        event.preventDefault()
                    }
                });
            });
            break;
            //------------------- Eliminar Joven ---------------------//   
        case 'eliminar-joven':
            // Llenar tabla
            document.addEventListener('DOMContentLoaded', function() {
                // Obtener la referencia de la tabla
                const table = document.querySelector('.table');
                controladoraJovenes.visualizarJovenes(table);
            });

            //Accion del boton
            document.addEventListener("DOMContentLoaded", function(event) {
                const botonElimiarJoven = document.querySelector("#eliminarJoven");

                botonElimiarJoven.addEventListener("click", function(evento) {
                    const cedula = document.getElementById("inputCedula5").value;

                    if (cedula != "") {
                        let confirmar = confirm("Seguro que desea eliminar al joven seleccionado?");
                        if (confirmar) {
                            controladoraJovenes.EliminarJoven(cedula);
                            location.reload()
                        } else { event.preventDefault() }

                    } else {
                        alert("Debe seleccionar un joven");
                        event.preventDefault()
                    }

                      
                });
            });
            break;
            //------------------- Modificar Joven ---------------------//
        case 'modificar-joven':
            //Llenar tabla
            document.addEventListener('DOMContentLoaded', function() {
                // Obtener la referencia de la tabla
                const table = document.querySelector('.table');
                setTimeout(function() {
                    controladoraJovenes.visualizarJovenes(table);
                }, 1500);
            });

            //Accion del boton
            document.addEventListener("DOMContentLoaded", function() {
                const botonModificarJoven = document.querySelector("#modificarJoven");
                botonModificarJoven.addEventListener("click", function(event) {

                    const nombre = document.getElementById("inputName5").value;
                    const apellido = document.getElementById("inputLastName5").value;
                    const cedula = document.getElementById("inputCedula5").value;
                    const correo = document.getElementById("inputEmail5").value;
                    const hobby = document.getElementById("inputHobbies5").value;
                    const redes = document.getElementById("inputRedSocial5").value;
                    const telefono = document.getElementById("inputTelefono5").value;
                    const fechaNacimiento = document.getElementById("inputFecha5").value;
                    const cedulaTabla = document.getElementById("Cedula").value;
                    let confirmar = confirm('Seguro que desea modificar el joven seleccionado?')
                    if (confirmar)
                        controladoraJovenes.ModificarJoven(nombre, apellido, cedula, correo, redes, hobby, telefono, fechaNacimiento, cedulaTabla);
                    else event.preventDefault()
                });
            });
            break;
            //------------------- Eliminar Usuario ---------------------//
        case 'eliminar-colaborador':
            //Llenar tabla
            document.addEventListener('DOMContentLoaded', async function() {
                // Obtener la referencia de la tabla
                const table = document.querySelector('.table');
                let valid = 0
                var Admin = document.getElementById("checkAdmin");
                var Colab = document.getElementById("checkColab");
                var Id = document.cookie.replace(/(?:(?:^|.*;\s*)Id\s*\=\s*([^;]*).*$)|^.*$/, "$1");
                setTimeout(function() {
                    controladoraUsuario.VisualizarUsuarios(table, valid, Id);
                }, 2000);

            });

            //Accion del boton
            document.addEventListener("DOMContentLoaded", function(event) {
                const botonElimiarUsuario = document.querySelector("#eliminarUsuario");

                botonElimiarUsuario.addEventListener("click", function(evento) {
                    const cedula = document.getElementById("inputCedula5").value;

                    let confirmar = confirm("Seguro que desea eliminar?")
                    if (confirmar) {
                        if (cedula == '') {
                            alert("Elija primero a un Usuario a eliminar")
                        } else {
                            controladoraUsuario.EliminarUsuario(cedula);
                            location.reload()
                        }
                    } else event.preventDefault()


                      
                });
            });
            break;
            //------------------- Modificar Usuario ---------------------//
        case 'modificar-colaborador':
            //Llenar tabla
            document.addEventListener('DOMContentLoaded', async function() {
                // Obtener la referencia de la tabla
                const table = document.querySelector('.table');
                var Id = document.cookie.replace(/(?:(?:^|.*;\s*)Id\s*\=\s*([^;]*).*$)|^.*$/, "$1");
                let valid = 1 // No borrar consultarme el porque de esta validacion 
                setTimeout(function() {
                    controladoraUsuario.VisualizarUsuarios(table, valid, Id);
                }, 2000);
            });

            //Accion del boton
            document.addEventListener("DOMContentLoaded", function() {
                const botonModificarUsuario = document.querySelector("#modificarUsuario");
                botonModificarUsuario.addEventListener("click", function(event) {

                    var Tipo
                    var Admin = document.getElementById("checkAdmin");
                    var Colab = document.getElementById("checkColab");

                    const nombre = document.getElementById("inputName5").value;
                    const apellido = document.getElementById("inputLastName5").value;
                    const correo = document.getElementById("inputEmail5").value;
                    const password = document.getElementById("inputPassword5").value;
                    const cedula = document.getElementById("inputCedula5").value;
                    const telefono = document.getElementById("inputTelefono5").value;
                    const fechaNacimiento = document.getElementById("inputFecha5").value;
                    const cedulaTabla = document.getElementById("Cedula").value;
                    const correoTabla = document.getElementById("Correo").value;
                    const descripcion = document.getElementById("inputDescripcion5").value;
                    if (Admin.checked) {
                        Tipo = 'Administrador'
                    } else if (Colab.checked) {
                        Tipo = 'Colaborador'
                    } else {
                        Tipo = ' ';
                    }

                    let confirmar = confirm("Seguro que desea modificar?")
                    if (confirmar) {
                        controladoraUsuario.ModificarUsuario(nombre, apellido, cedula, correo, cedulaTabla, telefono, fechaNacimiento, password, descripcion, correoTabla, Tipo);
                    } else event.preventDefault()

                });
            });

            break;
            //------------------- Mostrar Usuario ---------------------//
        case 'mostrar-colaborador':

            document.addEventListener('DOMContentLoaded', function() {
                // Obtener la referencia de la tabla
                const table = document.querySelector('.table');
                controladoraUsuario.ConsultarTodosUsuarios(table)
            });

            break;
            //------------------- Agregar Usuario ---------------------//  
        case 'agregar-Usuario':
            document.addEventListener("DOMContentLoaded", function(event) {
                const botonAgregarUsuario = document.querySelector("#agregarUsuario");
                botonAgregarUsuario.addEventListener("click", function() {

                    var Tipo;
                    var radioAdmin = document.getElementById("checkAdmin");
                    var radioColab = document.getElementById("checkColab");
                    const nombre = document.getElementById("inputName5").value;
                    const apellido = document.getElementById("inputLastName5").value;
                    const correo = document.getElementById("inputEmail5").value;
                    const password = document.getElementById("inputPassword5").value;
                    const cedula = document.getElementById("inputCedula5").value;
                    const telefono = document.getElementById("inputTelefono5").value;
                    const fechaNacimiento = document.getElementById("inputFecha5").value;
                    const descripcion = document.getElementById("inputDescripcion5").value;
                    if (radioAdmin.checked) {
                        Tipo = 'Administrador'
                    } else if (radioColab.checked) {
                        Tipo = 'Colaborador'
                    } else {
                        Tipo = ' ';
                    }

                    const confirmacion = confirm("Seguro que desea agregar?");
                    if (!confirmacion) {
                        event.preventDefault();
                    } else {
                        controladoraUsuario.AgregarUsuario(nombre, apellido, cedula, correo, telefono, fechaNacimiento, password, descripcion, Tipo)
                    }


                });
            });
            break;

            //------------------- PERFIL ---------------------//
        case 'Perfil':

            document.addEventListener('DOMContentLoaded', async function() {
                var Id = document.cookie.replace(/(?:(?:^|.*;\s*)Id\s*\=\s*([^;]*).*$)|^.*$/, "$1");
                setTimeout(function() {
                    controladoraUsuario.BuscarDatosPerfil(Id)
                }, 1500);
            });

            var formulario = document.getElementById("formularioModificarPerfil");
            formulario.addEventListener("submit", async function(event) {
                event.preventDefault();
            });

            //------------------- Modificar Perfil ---------------------//
            document.addEventListener("DOMContentLoaded", function() {
                const botonModificarJoven = document.querySelector("#botonGuardarCambiosPerfil");
                botonModificarJoven.addEventListener("click", async function(event) {
                    var Id = document.cookie.replace(/(?:(?:^|.*;\s*)Id\s*\=\s*([^;]*).*$)|^.*$/, "$1");
                    const nombre = document.getElementById("nombre").value;
                    const apellido = document.getElementById("apellido").value;
                    const correo = document.getElementById("correo").value;
                    const cedula = document.getElementById("cedula").value;
                    const telefono = document.getElementById("telefono").value;
                    const fechaNacimiento = document.getElementById("fechadeNacimiento").value;
                    const descripcion = document.getElementById("descripcion").value;

                    var confirmar = confirm("Seguro que desea modificar?");
                    if (confirmar) {
                        await controladoraUsuario.ModificarPerfil(Id, nombre, apellido, cedula, correo, telefono, fechaNacimiento, descripcion);
                        document.cookie = `Nombre=${nombre}; expires=Fri, 31 Dec 2024 23:59:59 UTC; path=/`;
                        document.cookie = `Apellido=${apellido}; expires=Fri, 31 Dec 2024 23:59:59 UTC; path=/`;

                        // Luego de realizar las acciones de modificación, activamos el envío del formulario
                    } else {
                        event.preventDefault();
                    }

                });
            });

            //------------------- Modificar Contraseña ---------------------//
            document.addEventListener("DOMContentLoaded", async function() {
                const botonCambiarPassword = document.querySelector("#CambiarPassword");
                botonCambiarPassword.addEventListener("click", async function(evento) {
                    const Id = document.cookie.replace(/(?:(?:^|.*;\s*)Id\s*\=\s*([^;]*).*$)|^.*$/, "$1");
                    const password = document.getElementById("password").value;
                    const newPassword = document.getElementById("newPassword").value;
                    const renewPassword = document.getElementById("renewPassword").value;
                    const valid = true

                    var regex = /^(?=.*\d)(?=.*\W).{7,15}$/

                    if (!regex.test(renewPassword) || !regex.test(newPassword)) {
                        alert("Lo lamento su nueva contraseña debe tener al menos 7-15 digitos un caracter especial y un numero")
                        valid = false
                    }

                    var confirmar = confirm("Seguro que desea cambiar su cotraseña ?")
                    if (confirmar && valid)
                        controladoraUsuario.CambiarPassword(password, newPassword, renewPassword, Id);
                    else evento.preventDefault()
                });
            });


            break;
            //------------------- Consultar Calendario ---------------------//   
        case 'consultar-calendario-evento':

            document.addEventListener('DOMContentLoaded', function() {
                const calendarEl = document.getElementById('calendar');
                const currentDate = new Date();
                const year = currentDate.getFullYear(); // Obtiene el año actual
                const month = currentDate.getMonth()
                const date = new Date(year, month, 1);

                const calendar = new FullCalendar.Calendar(calendarEl, {
                    plugins: ['interaction', 'dayGrid'],
                    defaultDate: date,
                    editable: false,
                    eventLimit: true,
                    nowIndicator: false,
                });

                controladoraEventos.BuscarEventos(calendar)
                calendar.render();
            });

            break
            //------------------- Agregar Evento ---------------------//
        case 'agregar-evento':
            document.addEventListener("DOMContentLoaded", function() {
                const botonAgregarEvento = document.querySelector("#agregarEvento");
                botonAgregarEvento.addEventListener("click", function(evento) {

                    const nombre = document.getElementById("nombreEvento").value;
                    const fecha = document.getElementById("fechaEvento").value;
                    const descripcion = document.getElementById("descripEvento").value;
                    const hora = document.getElementById("HoraEvento").value;
                    const idPersona = document.cookie.replace(/(?:(?:^|.*;\s*)Id\s*\=\s*([^;]*).*$)|^.*$/, "$1");;
                    confirm("Seguro que desea realizar la accion?")
                    if (confirm) {
                        controladoraEventos.ValidacionAgregar(nombre, fecha, idPersona, descripcion, hora)
                    } else event.preventDefault()
                });
            });
            break;
            //------------------- Modificar Evento ---------------------//
        case 'modificar-evento':
            //Llenar tabla
            document.addEventListener('DOMContentLoaded', async function() {
                // Obtener la referencia de la tabla
                const table = document.querySelector('.table');
                setTimeout(function() {
                    controladoraEventos.visualizarEventosModificarOEliminar(table);
                }, 1500);

            });


            // Boton de modificar
            document.addEventListener("DOMContentLoaded", function() {
                const botonModificarEvento = document.querySelector("#modificarEvento");
                botonModificarEvento.addEventListener("click", function(event) {
                    const auxiliarNombre = document.cookie.replace(/(?:(?:^|.*;\s*)respaldoNombre\s*\=\s*([^;]*).*$)|^.*$/, "$1");
                    const nombre = document.getElementById("nombreEvento").value;
                    const fecha = document.getElementById("fechaEvento").value;
                    const descripcion = document.getElementById("descripEvento").value;
                    const hora = document.getElementById("HoraEvento").value;
                    const idPersona = document.cookie.replace(/(?:(?:^|.*;\s*)Id\s*\=\s*([^;]*).*$)|^.*$/, "$1");
                    let confirmar = confirm("Seguro que desea modificar este evento?")
                    if (confirmar) {
                        controladoraEventos.ValidacionModificar(nombre, fecha, idPersona, descripcion, hora, auxiliarNombre)
                    } else event.preventDefault()
                });
            });
            break;
            //------------------- Eliminar Evento---------------------//
        case 'eliminar-evento':
            //Llenar tabla
            document.addEventListener('DOMContentLoaded', function() {
                // Obtener la referencia de la tabla
                const table = document.querySelector('.table');
                setTimeout(function() {
                    controladoraEventos.visualizarEventosModificarOEliminar(table);
                }, 1500);

            });

            //Accion del boton
            document.addEventListener("DOMContentLoaded", function() {
                const botonElimiarEvento = document.querySelector("#botonEliminarEvento");

                botonElimiarEvento.addEventListener("click", function(event) {
                    const nombre = document.getElementById("nombreEvento").value;
                    let respuesta = confirm("Seguro desea realizar la accion?")

                    if (respuesta) {
                        if (nombre == "") {
                            alert("Debe seleccionar un evento a eliminar");
                        } else {
                            controladoraEventos.EliminarEvento(nombre);
                            location.reload()
                        }
                    } else {
                        event.preventDefault();
                    }  
                });
            });

            break;
            //------------------- Confirmar Asistencia ---------------------//
        case 'confirmar-Asistencia':

            document.cookie = `IdEvento=${0}; expires=Fri, 31 Dec 2024 23:59:59 UTC; path=/`;
            document.cookie = `Contador=${0}; expires=Fri, 31 Dec 2024 23:59:59 UTC; path=/`;
            document.addEventListener('DOMContentLoaded', async function() {
                // Obtener la referencia de la tabla
                const table = document.querySelector('#TablaEventos');
                await controladoraEventos.visualizarEventos(table, toggle);
            });


            const toggle = document.querySelector('input[type="checkbox"]');
            let toggleActivable = true;

            toggle.addEventListener('change', async function() {

                if (this.checked) {

                    if (document.cookie.replace(/(?:(?:^|.*;\s*)IdEvento\s*\=\s*([^;]*).*$)|^.*$/, "$1") == 0)
                        alert("Debes seleccionar un evento")
                    else {
                        let id = document.cookie.replace(/(?:(?:^|.*;\s*)IdEvento\s*\=\s*([^;]*).*$)|^.*$/, "$1")
                        await controladoraEventos.BuscarJovenesEnUnEvento(id)
                    }
                    toggle.disabled = true;

                    setTimeout(function() {
                        toggle.disabled = false;
                    }, 4000);

                } else {


                    if (document.cookie.replace(/(?:(?:^|.*;\s*)IdEvento\s*\=\s*([^;]*).*$)|^.*$/, "$1") == 0)
                        alert("Debes seleccionar un evento")
                    else {
                        let id = document.cookie.replace(/(?:(?:^|.*;\s*)IdEvento\s*\=\s*([^;]*).*$)|^.*$/, "$1")
                        await controladoraEventos.BuscarJovenesQueNoEstanEnUnEvento(id)
                    }
                    toggle.disabled = true;

                    setTimeout(function() {
                        toggle.disabled = false;
                    }, 4000);
                }
            });

            break;
        case 'consultar-donacion':

            document.addEventListener('DOMContentLoaded', function() {
                const table = document.querySelector('.table');
                controladoraDonaciones.vizualizarDonaciones(table);
            });

            break
        case 'agregar-donacion':
            document.addEventListener("DOMContentLoaded", function() {
                const botonAgregarEvento = document.querySelector("#agregarDonacion");
                botonAgregarEvento.addEventListener("click", function(event) {

                    const nombreCorporacion = document.getElementById("nombreCorpDonacion").value;
                    const cantidad = document.getElementById("cantidadDonacion").value;
                    const descripcion = document.getElementById("descripcionDonacion").value;
                    var rif;
                    var cedula;
                    var tipoDonacion;
                    const fechaActual = new Date();
                    const dia = fechaActual.getDate();
                    const mes = fechaActual.getMonth() + 1; // Los meses empiezan en 0, por lo que sumamos 1
                    const anio = fechaActual.getFullYear();
                    const fecha = anio + '-' + mes + '-' + dia;

                    if (Rifboton.checked) {
                        rif = document.getElementById("RifInput").value;
                        cedula = "";
                    } else if (Cedulaboton.checked) {
                        cedula = document.getElementById("Cedulainput").value;
                        rif = "";
                    } else {
                        cedula = "";
                        rif = "";
                    }

                    if (DonacionBolivares.checked) {
                        tipoDonacion = "Bolívares";
                    } else if (DonacionDolares.checked) {
                        tipoDonacion = "Dólares";
                    } else if (DonacionMobiliario.checked) {
                        tipoDonacion = "Mobiliario";
                    } else if (DonacionAlimentos.checked) {
                        tipoDonacion = "Alimentos";
                    } else if (DonacionOtro.checked) {
                        tipoDonacion = "Otro";
                    } else {
                        tipoDonacion = "";
                    }

                    let confirmacion = confirm('Seguro que desea realizar la accion?')
                    if (confirmacion)
                        controladoraDonaciones.AgregarDonacion(nombreCorporacion, tipoDonacion, descripcion, rif, cedula, cantidad, fecha);
                    else event.preventDefault()
                });
            });

            break;
            //------------------- Modificar Donaciones ---------------------//

        case 'modificar-donacion':

            document.addEventListener('DOMContentLoaded', function() {
                const table = document.querySelector('.table');
                setTimeout(function() {
                    controladoraDonaciones.vizualizarDonacionesParaModificar(table);
                }, 1500);
            });

            const botonAgregarEvento = document.querySelector("#modificarDonacion");
            botonAgregarEvento.addEventListener("click", function(event) {

                const nombreCorporacion = document.getElementById("nombreCorpDonacion").value;
                const cantidad = document.getElementById("cantidadDonacion").value;
                const descripcion = document.getElementById("descripcionDonacion").value;
                var rif = document.getElementById('Rif-boton');
                var Cedula = document.getElementById('Cedula-boton');
                var Rif;
                var cedula;
                var Calendaredula;
                var tipoDonacion;
                const Id = document.cookie.replace(/(?:(?:^|.*;\s*)IdDonacion\s*\=\s*([^;]*).*$)|^.*$/, "$1");

                if (rif.checked) {
                    Rif = document.getElementById("Rif-Input").value;
                    cedula = "";
                } else if (Cedula.checked) {
                    cedula = document.getElementById("Cedula-input").value;
                    Rif = "";
                }

                if (DonacionBolivares.checked) {
                    tipoDonacion = "Bolívares";
                } else if (DonacionDolares.checked) {
                    tipoDonacion = "Dólares";
                } else if (DonacionMobiliario.checked) {
                    tipoDonacion = "Mobiliario";
                } else if (DonacionAlimentos.checked) {
                    tipoDonacion = "Alimentos";
                } else if (DonacionOtro.checked) {
                    tipoDonacion = "Otro";
                } else {
                    tipoDonacion = "";
                }

                let confirmar = confirm("Seguro que desea realizar la accion?")
                if (confirmar)
                    controladoraDonaciones.validacionCamposAModificar(nombreCorporacion, tipoDonacion, descripcion, Rif, cedula, cantidad, Id);
                else event.event.preventDefault();
            });

            break
        default:
    }



})();