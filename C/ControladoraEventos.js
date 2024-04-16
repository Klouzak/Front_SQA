
export class ControladoraEventos{


  async AgregarEvento(nombre,fecha,idPersona,descripcion,hora){

    fetch('http://localhost:3000/Eventos/agregarEvento', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      Nombre: nombre,
      Fecha: fecha,
      Descripcion:descripcion,
      IdPersona:idPersona,
      Hora:hora,
    })
  })
    .then(response => response.json())
    .then(data => {
        alert("Evento agregado con éxito");
    })
    .catch(error => {
      //alert('Error al agregar el evento: ', error);
    });
  }


    async BuscarEventos(calendar){
        await fetch('http://localhost:3000/Eventos/buscarEventos', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            let i=0
            while(i<data.cantidad){
                 calendar.addEventSource(this.cargarEventos(data,i));
                i++         
            }
        })
        .catch(error => {
          console.error('Error al buscar eventos', error);
        });
    }
    
    cargarEventos(data,i){
      var dynamicEvents = [
              {
              title: data.nombre[i],
              start: data.fecha[i]
              },
          ]
      return dynamicEvents   
    }
      

      // Modificar
      async ModificarEvento(nombre,fecha,idPersona,descripcion,hora, respladoNombre){

        await fetch('http://localhost:3000/Eventos/modificarEvento', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Nombre: nombre,
            Fecha: fecha,
            Descripcion:descripcion,
            IdPersonaQueModifico:idPersona,
            Hora:hora,
            RespaldoNombre:respladoNombre,
          })
        })
        .then(response => response.json())
        .then(data => {
          alert("Evento modificado con éxito");
        })
        .catch(error => {
          //alert('Error al modicifar el evento:', error);
        });
      }


      async visualizarEventos(table,toggle) {
        fetch('http://localhost:3000/Eventos/buscarEventos', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(response => response.json())
          .then(data => {
            let i=0;
            let numero = data.cantidad;
  
            do {
              let name = data.nombre[i];
              let Hora= data.Hora[i];
              let date = data.fecha[i];
              let Id= data.Id[i];
    
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
              cell2.innerHTML = name;
              cell3.innerHTML = date;
              cell4.innerHTML = Hora;
              cell5.innerHTML = Id; 

              cell5.classList.add("invisible-column");
              
      
              // Agregar el evento de clic a la nueva fila
              newRow.addEventListener('click', function() {
                // Obtener los datos de la fila clickeada
                var cells = this.getElementsByTagName('td');
                const rowData = [];
                let CC= new ControladoraEventos()
                document.cookie1 = `Nombre=${data.nombre}; expires=Fri, 31 Dec 2024 23:59:59 UTC; path=/`;

                for (var j = 0; j < cells.length; j++) {
                  rowData.push(cells[j].innerText); 

                  if(toggle.checked) toggle.checked=false
                }
                
                CC.BuscarDatosDeUnEventoNombre(rowData[1]);
                document.cookie = `IdEvento=${rowData[4]}; expires=Fri, 31 Dec 2024 23:59:59 UTC; path=/`;
                CC.BuscarJovenesQueNoEstanEnUnEvento(rowData[4])
                console.log("rowData"+rowData[4])
              });
      
          
              i++;
            } while (i!=numero);
            
          })
          .catch(error => {
            console.error('Error en la tabla: ', error);
          });
    
      }

      async BuscarDatosDeUnEventoNombre(name){
        fetch('http://localhost:3000/Eventos/buscarUnEventoPorNombre',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Nombre: name
          })
        })
       .then(response => response.json())
       .then(data => {
         this.LLenarCamposDeTextoDeEventos(data)
        })
       .catch(error => {
         console.error('Error: ', error);
       });   
    }
  
    LLenarCamposDeTextoDeEventos(data){
  
          let campoTextoNombre = document.getElementById("nombreEvento");
          campoTextoNombre.value = data.nombre;
  
          let campoTextoApellido = document.getElementById("fechaEvento");
          campoTextoApellido.value= data.fecha
  
          let campoTextoCorreo = document.getElementById("descripEvento")
          campoTextoCorreo.value= data.Descripcion
  
          let campoTextoFechaDeNacimiento= document.getElementById("HoraEvento")
          campoTextoFechaDeNacimiento.value= data.Hora
    }

    async EliminarEvento(name){

      await fetch('http://localhost:3000/Eventos/eliminarEvento', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Nombre : name
        })
      })
      .then(response => response.json())
      .then(data => {
        alert("Evento eliminado exitosamente");
      })
      .catch(error => {
        //alert('Error al eliminar el evento:', error);
      });
    }


 ///////////////////Metodos para confirmar Asistencia/////////////////
 
    async BuscarJovenesQueNoEstanEnUnEvento(idEvento){
      
       fetch('http://localhost:3000/Eventos/buscarJovenesQueNoEstanEnUnEvento', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        IdEvento: idEvento
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        let i=0;
        let numero = data.cantidad;
        
        console.log(data.cantidad)
        const table = document.querySelector('#TablaJovenes');

        var cuerpoTabla = document.getElementById("cuerpoTablaJovenes");

        var celdas = cuerpoTabla.querySelectorAll("td");
          celdas.forEach(function (celda) {
            var fila = celda.parentNode; // Obtener la fila a la que pertenece la celda
            fila.removeChild(celda); // Eliminar la celda de la fila
         });

  
          if(numero!=0) {
          do {
            
            let name = data.nombre[i];
            let apellido = data.apellido[i];
            let cedula= data.cedula[i];
            let fecha= data.fecha[i]
            let id= data.id[i]
  
            // Crear una nueva fila
          const newRow = table.insertRow();
  
          // Agregar las celdas a la fila
          const cell1 = newRow.insertCell(0);
          const cell2 = newRow.insertCell(1);
          const cell3 = newRow.insertCell(2);
          const cell4 = newRow.insertCell(3);
          const cell5 = newRow.insertCell(4);
          const cell6 = newRow.insertCell(5);
          const cell7 = newRow.insertCell(6);
  
  
          // Establecer el contenido de las celdas
          cell1.innerHTML = i;
          cell2.innerHTML = name;
          cell3.innerHTML = apellido;
          cell4.innerHTML = cedula;
          cell5.innerHTML = fecha;
          cell6.innerHTML = '<div class="form-check"><input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"><span class="loading-circle"></span></div>';
          cell7.innerHTML= id

          cell7.classList.add("invisible-column");

         const checkbox = cell6.querySelector('input[type="checkbox"]');  
        
        //////////////Evento activar o desactivar Asistencia///////////////

         checkbox.addEventListener('change', async function(event) {
          
          const loadingCircle = cell6.querySelector('.loading-circle');    

            if (this.checked) {

                const checkboxes = table.querySelectorAll('input[type="checkbox"]');
                checkboxes.forEach(checkbox => {
                  checkbox.disabled = true;
                });
                const toggle = document.querySelector('input[type="checkbox"]');
                toggle.disabled = true;
                const uncheckedCheckboxes = Array.from(checkboxes).filter(checkbox => !checkbox.checked);

          
                         
                    loadingCircle.style.display = "inline-block";
                      setTimeout(function() {
                          loadingCircle.style.display = "none";
                         uncheckedCheckboxes.forEach(checkbox => {
                          if(!checkbox.checked)
                          checkbox.disabled = false;
                          toggle.disabled = false;
                        });
                        toggle.disabled = false;      
                    }, 4000);

                    const row = this.closest('tr');
                    const id = row.querySelector('td:nth-of-type(7)').innerText;
                    const CE= new ControladoraEventos()
                    await CE.AgregarJovenaUnEvento(idEvento,id)

                    var count=document.cookie.replace(/(?:(?:^|.*;\s*)Contador\s*\=\s*([^;]*).*$)|^.*$/, "$1")
                    count++;
                    document.cookie= `Contador=${count}; expires=Fri, 31 Dec 2024 23:59:59 UTC; path=/`;

                    setTimeout(function() {
                      if(document.cookie.replace(/(?:(?:^|.*;\s*)Contador\s*\=\s*([^;]*).*$)|^.*$/, "$1")==1){
                        let id=document.cookie.replace(/(?:(?:^|.*;\s*)IdEvento\s*\=\s*([^;]*).*$)|^.*$/, "$1")
                        CE.BuscarJovenesQueNoEstanEnUnEvento(id) 
                        document.cookie= `Contador=${0}; expires=Fri, 31 Dec 2024 23:59:59 UTC; path=/`;               
                   }           
                    }, 3500);

                    
              }         
        });
     
          i++;
        } while (i!=numero);
      }
       
      })
      .catch(error => {
        console.error('Error al eliminar el colaborador:', error);
      });

    }

    async AgregarJovenaUnEvento(IdEvento,IdJoven){

   fetch('http://localhost:3000/Eventos//AgregarJovenEvento', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         idEvento: IdEvento,
         idJoven: IdJoven
      })
    })
      .then(response => response.json())
      .then(data => {
      })
      .catch(error => {
        console.error('Error: ', error);
      });

    }


///////////Buscar jovenes registrados en un evento/////////////////////////

    async BuscarJovenesEnUnEvento(idEvento){
      
       fetch('http://localhost:3000/Eventos/buscarJovenesQueEstanEnUnEvento', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        IdEvento: idEvento
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        let i=0;
        let numero = data.cantidad;

        const table = document.querySelector('#TablaJovenes');

        var cuerpoTabla = document.getElementById("cuerpoTablaJovenes");

        var celdas = cuerpoTabla.querySelectorAll("td");
          celdas.forEach(function (celda) {
            var fila = celda.parentNode; // Obtener la fila a la que pertenece la celda
            fila.removeChild(celda); // Eliminar la celda de la fila
         });

  
          if(numero!=0) {
          do {
            
            let name = data.nombre[i];
            let apellido = data.apellido[i];
            let cedula= data.cedula[i];
            let fecha= data.fecha[i]
            let id= data.id[i]
  
            // Crear una nueva fila
          const newRow = table.insertRow();
  
          // Agregar las celdas a la fila
          const cell1 = newRow.insertCell(0);
          const cell2 = newRow.insertCell(1);
          const cell3 = newRow.insertCell(2);
          const cell4 = newRow.insertCell(3);
          const cell5 = newRow.insertCell(4);
          const cell6 = newRow.insertCell(5);
          const cell7 = newRow.insertCell(6);
  
  
          // Establecer el contenido de las celdas
          cell1.innerHTML = i;
          cell2.innerHTML = name;
          cell3.innerHTML = apellido;
          cell4.innerHTML = cedula;
          cell5.innerHTML = fecha;
          cell6.innerHTML = '<div class="form-check"><input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked><span class="loading-circle"></span></div>';
          cell7.innerHTML= id

          cell7.classList.add("invisible-column");

         const checkbox = cell6.querySelector('input[type="checkbox"]');

        
        //////////////Evento activar o desactivar Asistencia///////////////

         checkbox.addEventListener('change', async function(event) {
              
          const loadingCircle = cell6.querySelector('.loading-circle');

              if (this.checked) {
              } else {
                
                const checkboxes = table.querySelectorAll('input[type="checkbox"]');
                checkboxes.forEach(checkbox => {
                  checkbox.disabled = true;
                });
                const toggle = document.querySelector('input[type="checkbox"]');
                toggle.disabled = true;
          
                         
                    loadingCircle.style.display = "inline-block";
                      setTimeout(function() {
                          loadingCircle.style.display = "none";
                         checkboxes.forEach(checkbox => {
                          if(checkbox.checked)
                          checkbox.disabled = false;
                          toggle.disabled = false;
                        });
                        toggle.disabled = false;      
                    }, 4000);

                    const row = this.closest('tr');
                    const id = row.querySelector('td:nth-of-type(7)').innerText;
                    const CE= new ControladoraEventos()
                    await CE.EliminarJovenaEvento(id)

                    var count=document.cookie.replace(/(?:(?:^|.*;\s*)Contador\s*\=\s*([^;]*).*$)|^.*$/, "$1")
                    count++;
                    document.cookie= `Contador=${count}; expires=Fri, 31 Dec 2024 23:59:59 UTC; path=/`;

                    setTimeout(function() {
                      if(document.cookie.replace(/(?:(?:^|.*;\s*)Contador\s*\=\s*([^;]*).*$)|^.*$/, "$1")==1){
                        let id=document.cookie.replace(/(?:(?:^|.*;\s*)IdEvento\s*\=\s*([^;]*).*$)|^.*$/, "$1")
                        CE.BuscarJovenesEnUnEvento(id) 
                        document.cookie= `Contador=${0}; expires=Fri, 31 Dec 2024 23:59:59 UTC; path=/`;               
                   }           
                    }, 3500);

                  }    
              });
          i++;
        } while (i!=numero);
      }
       
      })
      .catch(error => {
        console.error('Error :', error);
      });

    }

/////////////////////////////Eliminar joven de evento ///////////////////////////////////

    async EliminarJovenaEvento(IdJoven){

       fetch('http://localhost:3000/Eventos/EliminarJovenEvento', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         idJoven: IdJoven
      })
    })
      .then(response => response.json())
      .then(data => {

      })
      .catch(error => {
        console.error('Error: ', error);
      });

    }


    //////////////////////Visualizar eventos para modificar y eliminar

    async visualizarEventosModificarOEliminar(table) {
      fetch('http://localhost:3000/Eventos/buscarEventos', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(data => {
          let i=0;
          let numero = data.cantidad;

         do {
          // Obtener los datos de la fila (nombre, apellido, cédula, fecha)
          let name = data.nombre[i];
          let Hora= data.Hora[i];
          let date = data.fecha[i];

          // Crear una nueva fila
        const newRow = table.insertRow();

        // Agregar las celdas a la fila
        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2);
        const cell4 = newRow.insertCell(3);

        // Establecer el contenido de las celdas
        cell1.innerHTML = i;
        cell2.innerHTML = name;
        cell3.innerHTML = date;
        cell4.innerHTML = Hora;
        

        // Agregar el evento de clic a la nueva fila
        newRow.addEventListener('click', function() {
          // Obtener los datos de la fila clickeada
          var cells = this.getElementsByTagName('td');
          const rowData = [];
          let CC= new ControladoraEventos()
          document.cookie1 = `Nombre=${data.nombre}; expires=Fri, 31 Dec 2024 23:59:59 UTC; path=/`;
          for (var j = 0; j < cells.length; j++) {
            rowData.push(cells[j].innerText); 
          }  
          CC.BuscarDatosDeUnEventoNombre(rowData[1]);
          document.cookie = `respaldoNombre=${rowData[1]}; expires=Fri, 31 Dec 2024 23:59:59 UTC; path=/`;
        });

     
        i++;
      } while (i!=numero);
        
        })
        .catch(error => {
          console.error('Error al agregar el Evento:', error);
        });
  
    }


/////////Validaciones de los campos de texto Agregar Evento//////////////////

  async ValidacionAgregar(nombre,fecha,idPersona,descripcion,hora, auxiliarNombre){
                // Check that all of the fields are filled in.
                  var Nombre = document.getElementById("nombreEvento").value;
                  var Fecha = document.getElementById("fechaEvento").value;
                  var Descripción = document.getElementById("descripEvento").value;
                  var Hora = document.getElementById("HoraEvento").value;
                  var valid=true

                  const fechaActual = new Date();
                  const fechaActualString = fechaActual.toISOString().split('T')[0];
                  const fechaCampo = document.getElementById("fechaEvento").value;
                  const fechaCampoString = new Date(fechaCampo).toISOString().split('T')[0];

                  if (fechaCampoString < fechaActualString) {
                    alert("Lo lamento no se puede agregar eventos en fechas pasadas")
                    valid = false;
                  } 

                  if (Nombre == "" || Fecha == "" || Descripción == "") {
                    valid=false;
                  }
                
                  var reg=/^[a-zA-ZáéíóúüÁÉÍÓÚÜñÑ\s]+$/;
                  if (!reg.test(Nombre) || !reg.test(Descripción)){
                    valid=false;
                  }

                  var regexEvento=/^(0?[1-9]|1[0-2]):[0-5][0-9](am|pm)$/;
                  if (!regexEvento.test(Hora)){
                    valid=false;
                  }
                  
                  if(valid){    
                    this.ValidarNombreRepetido(nombre,fecha,idPersona,descripcion,hora,auxiliarNombre)  
                  }else{
                    return false;
                  }                   
   }

/////////Validaciones de los campos de texto Modificar Evento//////////////////

     async ValidacionModificar(nombre,fecha,idPersona,descripcion,hora, auxiliarNombre){
                // Check that all of the fields are filled in.
                  var Nombre = document.getElementById("nombreEvento").value;
                  var Fecha = document.getElementById("fechaEvento").value;
                  var Descripción = document.getElementById("descripEvento").value;
                  var Hora = document.getElementById("HoraEvento").value;
                  var valid=true

                const fechaActual = new Date();
                const fechaActualString = fechaActual.toISOString().split('T')[0];
                const fechaCampo = document.getElementById("fechaEvento").value;
                const fechaCampoString = new Date(fechaCampo).toISOString().split('T')[0];

                if (fechaCampoString < fechaActualString) {
                  alert("Lo lamento no se pueden modificar eventos a fechas pasadas")
                  valid = false;
                } 

                  if (Nombre == "" || Fecha == "" || Descripción == "") {
                    valid=false;
                  }
                
                  var reg=/^[a-zA-ZáéíóúüÁÉÍÓÚÜñÑ\s]+$/;
                  if (!reg.test(Nombre) || !reg.test(Descripción)){
                    valid=false;
                  }

                  var regexEvento=/^(0?[1-9]|1[0-2]):[0-5][0-9](am|pm)$/;
                  if (!regexEvento.test(Hora)){
                    valid=false;
                  }
                  
                  if(valid){    
                    this.ValidarSiHayUnSoloEventoConMismoNombre(Nombre,fecha,idPersona,descripcion,hora, auxiliarNombre);
                  }else{
                    return false;
                  }                   
    }


/////////////////// Validacion de nombre repetido en evento////////////////////

async ValidarNombreRepetido(nombre,fecha,idPersona,descripcion,hora,auxiliarNombre){

       await fetch('http://localhost:3000/Eventos/validarNombreEvento', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         Nombre: nombre
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);

        if(data){
                this.AgregarEvento(nombre,fecha,idPersona,descripcion,hora);
                location.reload()
       }else{
          alert("No se pudo agregar, ya existe un evento con ese nombre");
        }
      })
      .catch(error => {
        console.error('Error al eliminar el colaborador:', error);
      });

    }


///////////////////Validar para modificar//////////////////

    async ValidarSiHayUnSoloEventoConMismoNombre(nombre,fecha,idPersona,descripcion,hora, auxiliarNombre){

      await fetch('http://localhost:3000/Eventos/validarNombreEventoParaModificar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         Nombre: nombre,
         AuxiliarNombre:auxiliarNombre
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);

        if(data){
                this.ModificarEvento(nombre,fecha,idPersona,descripcion,hora,auxiliarNombre);
                location.reload()
       }else{
              alert("No se pudo agregar, ya existe un evento con ese nombre")
        }
      })
      .catch(error => {
        console.error('Error al eliminar el colaborador:', error);
      });

    }



}    