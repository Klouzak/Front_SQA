import { Usuario } from './Usuario';

export class Jovenes {

    //Constructores
    Jovenes() {
        this.id = 0;
        this.nombre = " ";
        this.apellido = " ";
        this.cedula = " ";
        this.telefono = " ";
        this.correo = " ";
        this.redes = " ";
        this.hobby = " ";
        this.fechaNacimiento = " ";
    }

    constructor(nombre, apellido, cedula, telefono, correo, redes, hobby, fechaNacimiento) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.cedula = cedula;
        this.telefono = telefono;
        this.correo = correo;
        this.redes = redes;
        this.hobby = hobby;
        this.fechaNacimiento = fechaNacimiento;
    }

//////////////////////////////Conexiones a la base de datos para consultar la tabla de Jovenes/////////////////////////////


    // En este metodo no se necesita pase de parametro pero, para invocarlo per debes
    // crear una lista del objeto joven ya que dicho metodo retorna una lista 
    // que posee los datos de todos los jovenes registrados

    async ConsultarJovenesRegistrados() {
        const sql = require('mssql');
        const config = { //////////////////////Datos requeridos para la conexion a Azure(base de datos)////
            user: 'Jhonatan',
            password: 'Administrador.**',
            server: 'acasias-server.database.windows.net',
            port: 1433,
            database: 'Proyecto Las Acasias',
            authentication: {
                type: 'default'
            },
            options: {
                encrypt: true
            }
        }
        try { /////////////// Intento de conexion y de ser posible ejecutar el query de Consulta//////
            var poolConnection = await sql.connect(config);
            console.log("Reading rows from the Table...");
            var resultSet = await poolConnection.request().query("SElECT * FROM dbo.Jovenes");
            //console.log(resultSet.Nombre);
            for (const row of resultSet.recordset) {
                console.log(row.Nombre);
            }
            // close connection only when we're certain application is finished
            poolConnection.close();
        } catch (err) {
            console.error(err.message);
        }
    }


    //En este metodo se pasa por parametro el objeto joven donde dicho objeto debe tener todos los datos
    //del nuevo joven a agregar

    async AgregarNuevoJoven(Joven) {

        const sql = require('mssql');
        const config = { ////////////////////// Datos requeridos para la conexion a Azure(base de datos)////
            user: 'Jhonatan',
            password: 'Administrador.**',
            server: 'acasias-server.database.windows.net',
            port: 1433,
            database: 'Proyecto Las Acasias',
            authentication: {
                type: 'default'
            },
            options: {
                encrypt: true
            }
        }
        try { /////////////// Intento de conexion y de ser posible ejecutar el query para insertar//////
            var poolConnection = await sql.connect(config);
            console.log("Reading rows from the Table...");
            var resultSet = await poolConnection.request().query("INSERT INTO dbo.Jovenes (Nombre, Apellido, Cedula, Correo, Instagram, Hobby, [Fecha de nacimiento]) " +
                "VALUES ('" + Joven.nombre + "', '" + Joven.apellido + "', '" + Joven.cedula + "'," +
                "'" + Joven.fechaNacimiento + "', '" + Joven.hobby + "', '" + Joven.redes + "', '" + Joven.correo + "')");


            console.log(resultSet);

            // close connection only when we're certain application is finished
            poolConnection.close();
        } catch (err) {
            console.error(err.message);
        }
    }


    // En este metodo se pasa por parametro el objeto joven pero, solo es necesario 
    // que el atributo de Id haya sido asignado con un valor distinto del predeterminado

    async EliminarJovenATravesDeSuId(Joven) {

        const sql = require('mssql');
        const config = { //////////////////Datos requeridos para la conexion a Azure(base de datos)////
            user: 'Jhonatan',
            password: 'Administrador.**',
            server: 'acasias-server.database.windows.net',
            port: 1433,
            database: 'Proyecto Las Acasias',
            authentication: {
                type: 'default'
            },
            options: {
                encrypt: true
            }
        }
        try { /////////Se intenta realizar la conexion y de ser posible se ejecuta el query de eliminar///
            var poolConnection = await sql.connect(config);
            console.log("Reading rows from the Table...");
            var resultSet = await poolConnection.request().query("Delete from dbo.Jovenes where Id=(" + Joven.id + ")");

            console.log(resultSet);

            // close connection only when we're certain application is finished
            poolConnection.close();
        } catch (err) {
            console.error(err.message);
        }
    }

}



/*const sql = require('mssql')

const poolConfig = {
  user: 'username',
  password: 'password',
  server: 'localhost',
  database: 'database'
}



// Usage:
const jovenId = 123
const success = await removeJoven(jovenId)
console.log(`Joven with ID ${jovenId} was ${success ? 'successfully removed' : 'not found'}.`)*/
