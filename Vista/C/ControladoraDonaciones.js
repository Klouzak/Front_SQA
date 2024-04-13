
export class ControladoraDonaciones{

  async vizualizarDonaciones(table){
    fetch('http://localhost:3000/Donaciones/buscarTodoDonaciones', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => {
      let i=0;
      let numero = data.length;

      do {

        let corporacion = data.nombreCorporacion[i];
        let cantidad = data.cantidad[i];
        let tipo = data.tipoDonacion[i];
        let cedula = data.cedula[i];
        let rif = data.rif[i];
        let fecha=data.fecha[i]
        let desc=data.descripcion[i]

        const newRow = table.insertRow();

        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2);
        const cell4 = newRow.insertCell(3);
        const cell5 = newRow.insertCell(4);
        const cell6 = newRow.insertCell(5);
        const cell7 = newRow.insertCell(6);

        cell1.innerHTML = i;
        cell2.innerHTML = corporacion;
        cell3.innerHTML = cantidad;
        cell4.innerHTML = tipo;
        cell6.innerHTML=fecha
        cell7.innerHTML= desc
        if (cedula!=""){
          cell5.innerHTML = cedula;
        } else {
          cell5.innerHTML = rif;
        }
        

        i++;
      } while (i!=numero);

    })
    .catch(error => {
      console.error('Error', error);
    });
  }


  async AgregarDonacionBase(nombreCorporacion,tipoDonacion,descripcion,rif,cedula,cantidad,fechaActual){

      fetch('http://localhost:3000/Donaciones/agregarDonacion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Agrega los datos del joven que deseas enviar en la solicitud
          NombreCorporacion: nombreCorporacion,
          TipoDonacion: tipoDonacion,
          Descripcion: descripcion,
          Rif: rif,
          Cedula:cedula,
          Cantidad: cantidad,
          fecha:fechaActual,
        })
      })
      .then(response => response.json())
      .then(data => {
        alert("Donacion agregada con éxito");
      })
      .catch(error => {
        alert('Error al agregar la donacion:', error);
      });
   }

  async validacionDonacion(nombreCorporacion,tipoDonacion,descripcion,rif,cedula,cantidad) {
    var correcto = true;

    if (nombreCorporacion == "" || tipoDonacion == "" || descripcion == "" || cantidad == "" || (rif == "" && cedula == "")) {
      correcto = false;
    } else {
      

      if ((rif == "") && (cedula<10000000 || cedula>50000000) ){
        correcto = false;
      }

      if ((cedula == "")  && (/^(V|E|J|G)\d{8,9}$/.test(rif)==false) ){
        correcto = false;
      }


      var reg=/^[a-zA-ZáéíóúüÁÉÍÓÚÜñÑ\s]+$/;
      if (!reg.test(descripcion) || !reg.test(nombreCorporacion)){
        return false;
      }

      if (cantidad <= 0) {
        correcto = false;
      }

    }  

    if(correcto){
      setTimeout(function() {
                location.reload();
            }, 1500);
    }

    return correcto;  
  }


  async AgregarDonacion(nombreCorporacion,tipoDonacion,descripcion,rif,cedula,cantidad,fechaActual){
    const val= await this.validacionDonacion(nombreCorporacion,tipoDonacion,descripcion,rif,cedula,cantidad);
    if (val==true)  {this.AgregarDonacionBase(nombreCorporacion,tipoDonacion,descripcion,rif,cedula,cantidad,fechaActual); }
  }


////////////Visualizar donaciones para Modificar///////////////

 async vizualizarDonacionesParaModificar(table){
    fetch('http://localhost:3000/Donaciones/buscarTodoDonaciones', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => {
      let i=0;
      let numero = data.length;

      do {

        let corporacion = data.nombreCorporacion[i];
        let cantidad = data.cantidad[i];
        let tipo = data.tipoDonacion[i];
        let cedula = data.cedula[i];
        let rif = data.rif[i];
        let Id = data.Id[i];

        const newRow = table.insertRow();

        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2);
        const cell4 = newRow.insertCell(3);
        const cell5 = newRow.insertCell(4);
        const cell6 = newRow.insertCell(5);


        cell1.innerHTML = i;
        cell2.innerHTML = corporacion;
        cell3.innerHTML = cantidad;
        cell4.innerHTML = tipo;
        cell6.innerHTML = Id;
        if (cedula!=""){
          cell5.innerHTML = cedula;
        } else {
          cell5.innerHTML = rif;
        }

        cell6.classList.add("invisible-column");

         // Agregar el evento de clic a la nueva fila
        newRow.addEventListener('click', function() {
            // Obtener los datos de la fila clickeada
            var cells = this.getElementsByTagName('td');
            const CD= new ControladoraDonaciones()
            const rowData = [];
            for (var j = 0; j < cells.length; j++) {
              rowData.push(cells[j].innerText); 
            }
            console.log("rowData"+rowData[5])
            document.cookie= `IdDonacion=${rowData[5]}; expires=Fri, 31 Dec 2024 23:59:59 UTC; path=/`;

            CD.BuscarDonacionPorID(rowData[5])
        });   

        i++;
      } while (i!=numero);

    })
    .catch(error => {
      console.error('Error', error);
    });
  }


 ///////////////Buscar Donacion por ID/////////////////
 
   async BuscarDonacionPorID(id){

        await fetch('http://localhost:3000/Donaciones/buscarDonacionPorId', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Id: id,
          })
        })
        .then(response => response.json())
        .then(data => {
          this.llenarCamposDeTextpModificar(data)
        })
        .catch(error => {
          console.error('Error al modicifar el evento:', error);
        });
      }

/////////////////////Llenar campos de texto para modificar////////////////////


    async llenarCamposDeTextpModificar(data){

       var CI = document.getElementById('Cedula-input');
       var Rif = document.getElementById('Rif-Input');
       var rif = document.getElementById('Rif-boton');
       var cedula = document.getElementById('Cedula-boton');

       document.getElementById("nombreCorpDonacion").value=data.nombreCorporacion
       document.getElementById("cantidadDonacion").value= data.cantidad
       document.getElementById("descripcionDonacion").value= data.descripcion

        if(data.cedula==''){
            rif.checked=true
            CI.value=''
            CI.disabled= true
            Rif.value= data.rif
            if(Rif.disabled==true) Rif.disabled=false
        }
        if(data.rif==''){
            cedula.checked=true
            Rif.value=''
            Rif.disabled=true
            CI.value=data.cedula
            if(CI.disabled==true) CI.disabled=false
          }

         if(data.tipoDonacion=='Bolívares') {
            DonacionBolivares.checked=true
         }

         if(data.tipoDonacion== 'Dólares'){
            DonacionDolares.checked=true
         }

         if(data.tipoDonacion=='Mobiliario'){
            DonacionMobiliario.checked=true
         }

         if(data.tipoDonacion=='Alimentos'){
            DonacionAlimentos.checked=true
         }

         if(data.tipoDonacion=='Otro'){
            DonacionOtro.checked=true
         }

      }

 //////////// Validar campos de texto modificar Donacion////////

 async validacionCamposAModificar(nombreCorporacion,tipoDonacion,descripcion,rif,cedula,cantidad,Id) {
    var correcto = true;

    if (nombreCorporacion == "" || tipoDonacion == "" || descripcion == "" || cantidad == "" || (rif == "" && cedula == "")) {
      correcto = false;
    } else {
      

      if ((rif == "") && (cedula<10000000 || cedula>50000000) ){
        correcto = false;
      }

      
      if ((cedula == "")  && (/^(V|E|J|G)\d{8,9}$/.test(rif)==false)){
      var regexRif=/^V\d{9}$/i;
      if (!regexRif.test(rif)){
        correcto = false;
      }
    }


      var reg=/^[a-zA-ZáéíóúüÁÉÍÓÚÜñÑ\s]+$/;
      if ((!reg.test(descripcion)) || (!reg.test(nombreCorporacion))){
        return false;
      }

      if (cantidad <= 0) {
        correcto = false;
      }

    }  

    if(correcto){
      this.ModifcarDonacion(nombreCorporacion,tipoDonacion,descripcion,rif,cedula,cantidad,Id)
      location.reload();         
    }

  } 
  
  
///////////////// Funcion para Modificar evento//////////////////////////

  async ModifcarDonacion(nombreCorporacion,tipoDonacion,descripcion,rif,cedula,cantidad,id){

        await fetch('http://localhost:3000/Donaciones/modificarDonacion', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Id: id,
            NombreCorporacion: nombreCorporacion,
            TipoDonacion: tipoDonacion,
            Descripcion: descripcion,
            Rif: rif,
            Cedula:cedula,
            Cantidad: cantidad,
          })
        })
        .then(response => response.json())
        .then(data => {
          alert("Donacion modificada con éxito");
        })
        .catch(error => {
          //alert('Error al modicifar el evento:', error);
        });
  }



}