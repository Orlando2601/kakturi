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
                colores VARCHAR(255) NOT NULL)`;        
             
    const sql2Material = `CREATE TABLE Material(
                id INT PRIMARY KEY AUTO_INCREMENT,
                tipo_material VARCHAR(255) NOT NULL)`;

    
    const sql3LlenarTabla = `INSERT INTO Productos (id, nombre, descripcion, precio, imagen, id_material, colores) 
            VALUES 
            (1, "Dije collar ",  "loco", 1000, "imagen1645022559405.png", 1, "blue, yellow, red"), 
            (2, "flor",  "locquito", 2000, "imagen1645022732376.png", 2, "blue, yellow, red"),  
            (4, "separador", "locote", 3000, "imagen1645022792207.png", 3, "blue, yellow, red"),
            (5, "separador", "locote", 3000, "imagen1645022905514.png", 3, "blue, yellow, red"),
            (6, "separador", "locote", 3000, "imagen1645023003355.png", 3, "blue, yellow, red"),
            (7, "separador", "locote", 3000, "imagen1645023179127.png", 3, "blue, yellow, red"),
            (8, "separador", "locote", 3000, "imagen1645023286353.png", 3, "blue, yellow, red"),
            (9, "separador", "locote", 3000, "imagen1645024326484.png", 3, "blue, yellow, red")`;  
   
    const sql4LlenarTablaMaterial = `INSERT INTO Material (id, tipo_material) 
    VALUES 
        (1, "Acero"),
        (2, "Rodio"),
        (3, "Golfield"),
        (4, "Plastico"),
        (5, "Cristal")`;

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

           
            
            connection.query(sql3LlenarTabla, function (err, result) {
                if(!err){
                    console.log("Llenado de tabla Productos OK");
                }else{
                    if(err.code){
                        console.log(err);
                    }
                }
            });

            connection.query(sql4LlenarTablaMaterial, function (err, result) {
                if(!err){
                    console.log("Llenado de tabla material ok");
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