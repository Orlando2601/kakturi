const mysql = require('mysql2');
const config = require('./config')
const {username, password, database, host, dialect} = {...config.development}

const crearTablas = ()=>{
  
    const connection =  mysql.createConnection({
        host,
        user:username,
        password,
        database
    });

     connection.connect((error)=>{!error ? console.log("Conexion Correcta") : console.log(error)});

    const sql1Productos = `CREATE TABLE Productos(
                id INT PRIMARY KEY AUTO_INCREMENT,
                nombre VARCHAR(255) NOT NULL,
                descripcion VARCHAR(255) NOT NULL,
                precio INT NOT NULL,
                imagen VARCHAR(255) NOT NULL,
                id_material INT NOT NULL,
                id_color INT NOT NULL)`;        
             
    const sql2Material = `CREATE TABLE Material(
                id INT PRIMARY KEY AUTO_INCREMENT,
                tipo_material VARCHAR(255) NOT NULL)`;

    const sql3Colores = `CREATE TABLE Colores(
                id INT PRIMARY KEY AUTO_INCREMENT, 
                color VARCHAR(255) NOT NULL)`;
    const sql4LlenarTabla = `INSERT INTO Productos (id, nombre, descripcion, precio, imagen, id_material, id_color) 
            VALUES 
            (1, "dije",  "loco", 1000, "si", 1, 1), 
            (2, "flor",  "locquito", 2000, "si", 2, 1),  
            (3, "separador", "locote", 3000, "si", 3, 1)`;  

            connection.query((sql1Productos),(err, result) =>{
                if(!err){
                    console.log("creada tabla 1 Productos");
                }else{
                    if(err.code === 1050){
                        console.log(' ya exite tabla 1 Productos');
                    }
                }
            });

            connection.query(sql2Material, function (err, result) {
                if(!err){
                    console.log("creada tabla 2 Material");
                    
                }else{
                    if(err.code === 1050){
                        console.log(' ya exite tabla 2 Material');
                    }
                }
            });

            connection.query(sql3Colores, function (err, result) {
                if(!err){
                    console.log("creada tabla 3 Colores");
                    
                }else{
                    if(err.code === 1050){
                        console.log(' ya exite tabla 3 Colores');
                    }
                }
                
            });
            
            connection.query(sql4LlenarTabla, function (err, result) {
                if(!err){
                    console.log("Llenado de tabla Productos OK");
                }else{
                    if(err.code){
                        console.log(err);
                    }
                }
            });
            
            connection.end();
}


module.exports={
     crearTablas
}