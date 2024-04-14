


export class ControladoraJovenes{


  async AgregarJovenBase(nombre, apellido, cedula, correo, redes, hobby, telefono, fechaNacimiento) {
    fetch('http://localhost:3000/Jovenes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Nombre: nombre,
        Apellido: apellido,
        Cedula: cedula,
        Correo: correo,
        Instagram: redes,
        Hobby: hobby,
        Telefono: telefono,
        Fecha_de_nacimiento: fechaNacimiento
      })
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error en la solicitud');
        }
      })
      .then(data => {
       // alert("Si se pudo");
      })
      .catch(error => {
       // alert('Error al agregar el joven: ' + error);
      });
  }

  async validacionJoven(Nombre,Apellido,Cedula,Correo,Redes,Hobby,Telefono,FNacimiento,cedulaTabla) {
      var correcto = true;

    const fechaActual = new Date();
    const fechaActualYear = fechaActual.getFullYear();

    const fechaCampo = FNacimiento
    const fechaCampoYear = new Date(fechaCampo).getFullYear();


      if (Nombre == "" || Apellido == "" || Correo == "" || Cedula == "" || Telefono == "" || FNacimiento == "") {
        correcto = false;
      } else {

        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(Correo)) {
          correcto = false;
        }

        if (fechaCampoYear < 1995 || fechaCampoYear > 2013) {
          alert("La fecha de nacimiento debe estar entre 1995 y 2013.");
          correcto = false;
        } else if (fechaCampoYear === fechaActualYear) {
          alert("La fecha de nacimiento ingresada es igual al año actual debe estar entre 1995 y 2013.");
          correcto = false;
        } else if (fechaCampoYear > fechaActualYear) {
          alert("La fecha ingresada es posterior al año actual, debe estar entre 1995 y 2013");
          correcto = false;
        } 
        
        if (Cedula<10000000 || Cedula>50000000){
          correcto = false;
        }

        var reg=/^[a-zA-ZáéíóúüÁÉÍÓÚÜñÑ\s]+$/;
        if ((reg.test(Nombre)==false) || (reg.test(Apellido)==false)){
          correcto = false;
        }

        var regex = /^0(414|412|424|416|426|02\d)-\d{7}$/;
        if (regex.test(Telefono)==false) {
          correcto = false;
        }

        var resultadoValidacion = await this.ValidarCedula(Cedula);

        if ((resultadoValidacion != 0) && (resultadoValidacion != cedulaTabla) ){
          alert("Esa persona ya se encuentra registrada") ;
          correcto = false;
        }
      }  

      if(correcto==true){
        setTimeout(function() {
                  location.reload();
        }, 1500);
      }

      return correcto;  
    }

  async ValidarCedula(cedula){
    var x=0;
    await fetch('http://localhost:3000/Jovenes/validarCedula', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Cedula:cedula,
      })
    })
    .then(response => response.json())
    .then(data => {
        x=data;
    })
    .catch(error => {
      console.error('Error al validar la cedula', error);
    });
    return x;
  }



  async AgregarJoven(nombre,apellido,cedula,correo,redes,hobby,telefono,fechaNacimiento){
    const val= await this.validacionJoven(nombre,apellido,cedula,correo,redes,hobby,telefono,fechaNacimiento,1);
    if (val==true)  {this.AgregarJovenBase(nombre,apellido,cedula,correo,redes,hobby,telefono,fechaNacimiento); 
                      location.reload();
                      }
  }


  async ModificarJovenBase(nombre,apellido,cedula,correo,redes,hobby,telefono,fechaNacimiento,cedulaTabla){

    fetch('http://localhost:3000/Jovenes/ModificarJoven', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Nombre: nombre,
        Apellido: apellido,
        Cedula: cedula,
        Correo: correo,
        Instagram:redes,
        Hobby: hobby,
        Telefono: telefono,
        Fecha_de_nacimiento:fechaNacimiento,
        CedulaTabla:cedulaTabla
      })
    })
    .then(response => response.json())
    .then(data => {
        //alert("Joven modificado con éxito");
    })
    .catch(error => {
      //alert('Error al modicifar el joven:', error);
    });
 } 

 async ModificarJoven(nombre,apellido,cedula,correo,redes,hobby,telefono,fechaNacimiento,cedulaTabla){
  const val= await this.validacionJoven(nombre,apellido,cedula,correo,redes,hobby,telefono,fechaNacimiento,cedulaTabla);
   if (val==true)  {
    this.ModificarJovenBase(nombre,apellido,cedula,correo,redes,hobby,telefono,fechaNacimiento,cedulaTabla); 
      location.reload()}
 } 


  async EliminarJoven(cedula){

    await fetch('http://localhost:3000/Jovenes/Eliminar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      Cedula: cedula
    })
  })
    .then(response => {})
    .then(data => {
     // alert("Joven eliminado correctamente");
    })
    .catch(error => {
    // alert('Error al eliminar joven:', error);
    });

}


  async visualizarJovenes(table) {
    fetch('http://localhost:3000/Jovenes', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        let i=0;
        let numero = data.Cantidad;

        do {

          let nombre = data.nombres[i];
          let apellido = data.apellidos[i];
          let cedula = data.Cedulas[i];
          let fecha = data.FechaNacimiento[i];
         

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
          cell5.innerHTML = fecha;

          // Agregar el evento de clic a la nueva fila

          newRow.addEventListener('click', function() {
            // Obtener los datos de la fila clickeada
            var cells = this.getElementsByTagName('td');
            const rowData = [];
            let CC= new ControladoraJovenes()
            
            for (var j = 0; j < cells.length; j++) {
              rowData.push(cells[j].innerText);
            }
            CC.BuscarDatosDeUnJovenPorCedula(rowData[3])
          });

      
          i++;
        } while (i!=numero);
      

      })
      .catch(error => {
        console.error('Error: ', error);
      });
  }

  async BuscarDatosDeUnJovenPorCedula(cedula){
    fetch('http://localhost:3000/Jovenes/BuscarDatosDeUnJoven',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // Agrega los datos del joven que deseas enviar en la solicitud,
        Cedula: cedula
      })
    })
    .then(response => response.json())
    .then(data => {
      this.LLenarCamposDeTextoDeEliminarJovenes(data)
    })
    .catch(error => {
      console.error('Error: ', error);
    });   
}

LLenarCamposDeTextoDeEliminarJovenes(data){

      let campoTextoNombre = document.getElementById("inputName5");
      campoTextoNombre.value = data.nombres;

      let campoTextoApellido = document.getElementById("inputLastName5");
      campoTextoApellido.value= data.apellidos

      let campoTextoCorreo = document.getElementById("inputEmail5")
      campoTextoCorreo.value= data.Correos

      let campoTextoFechaDeNacimiento= document.getElementById("inputFecha5")
      campoTextoFechaDeNacimiento.value= data.FechaNacimiento

      let campoTextoCedula = document.getElementById("inputCedula5")
      campoTextoCedula.value= data.Cedulas

      let campoTextoTelefono= document.getElementById("inputTelefono5")
      campoTextoTelefono.value= data.Telefonos

      let campoTextoHobbie= document.getElementById("inputHobbies5")
      campoTextoHobbie.value = data.hobbies

      let CampoTextoInstagram= document.getElementById("inputRedSocial5")
      CampoTextoInstagram.value= data.redes

      let CampoEstaticoDeVelorCedula =document.getElementById('Cedula')
      CampoEstaticoDeVelorCedula.value = data.Cedulas;
}

async MostarJovenes(table) {
    fetch('https://sqa-kcgp.onrender.com/Jovenes', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
          let i=0;
          let numero = data.Cantidad;

          do {
            // Obtener los datos de la fila (nombre, apellido, cédula, fecha)
            let nombre = data.nombres[i];
            let apellido = data.apellidos[i];
            let cedula = data.Cedulas[i];
            let fecha = data.FechaNacimiento[i];
            

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
            cell5.innerHTML = fecha;
      
            i++;
        } while (i!=numero);
      })
      .catch(error => {
        console.error('Error en la tabla: ', error);
      });

  }

  async ConsultarJovenes(table) {
    fetch('http://localhost:3000/Jovenes', {
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
          let fecha = data.FechaNacimiento[i];
          let telefono= data.Telefonos[i]
          let correo= data.Correos[i]


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
          cell2.innerHTML = nombre;
          cell3.innerHTML = apellido;
          cell4.innerHTML = cedula;
          cell5.innerHTML = fecha;
          cell6.innerHTML= telefono
          cell7.innerHTML = correo
          

          i++;
        } while (i != numero);
      })
      .catch(error => {
        console.error('Error en la tabla: ', error);
      });

  }

  


}

