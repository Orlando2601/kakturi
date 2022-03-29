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
            (1, "Dije tapa ",  "Dije en rodio aprox 20mm", 5500, "imagen1645022559405.png", 2, "white, red, black, pink, blue, purple, pink, gray"), 
            (2, "Dije corazon",  "Dije en forma de corazon colores rosados en el aprox 20 mm", 6000, "imagen1645022732376.png", 2, "pink"),  
            (3, "Dije hoja", "Dije aprox 10 mm para pulsera forma de hoja", 4500, "imagen1645022792207.png", 2, "green"),
            (4, "Dije gato", "Gato persa color dorado para collar aprox 20 mm", 7000, "imagen1645022905514.png", 2, "gold"),
            (5, "Separador ", "Cuenca para pulsera, plastica forma de corazon con carita", 300, "imagen1645023179127.png", 4, "blue, purple, pink, green, red, orange"),
            (6, "Separador", "Cuenca para pulsera, plastica forma de flor con carita", 300, "imagen1645023286353.png", 4, "blue, purple, pink, green, red, orange"),
            (7, "Dije ojo", "Dije para collar o pulsera en rodio, aprox 15 mm", 3000, "imagen1645024326484.png", 2, "blue"),
            (8, "Dije", "Separador centro pulsera forma de guayos futbol, aprox 20 mm", 8500, "imagen1645024509697.png", 1, "gold")`;  
   
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

            const sql5Usuarios = `CREATE TABLE Usuarios(
                id INT PRIMARY KEY AUTO_INCREMENT,
                nombre VARCHAR(255) NOT NULL,
                apellido VARCHAR(255) NOT NULL,
                correo VARCHAR(255) NOT NULL,
                contrasenia VARCHAR(255) NOT NULL,
                imagen VARCHAR(255) NOT NULL,
                id_tipoUser INT NOT NULL)`;
          
            const sql6TipoUser = `CREATE TABLE TipoUser(
                id INT PRIMARY KEY AUTO_INCREMENT,
                tipo_user VARCHAR(255) NOT NULL)`; 
            
            const sql7LlenarTablaUsuarios=`INSERT INTO Usuarios (id, nombre, apellido, correo, contrasenia, imagen, id_tipoUser) 
            VALUES 
            (1, "Admin", "Master", "adminmaster@cacturi.com", "$2a$10$BrprotO/cVqNsyZ4XlIn3O1jg8gxOZrAq3oRWQM1R7Ze9wL.iO4ci", "imagen1644979484561.png", 1),
            (2, "oswar", "baez", "oswar@gmail.com", "$2a$10$BrprotO/cVqNsyZ4XlIn3O1jg8gxOZrAq3oRWQM1R7Ze9wL.iO4ci", "imagen1644979484561.png", 2),
            (3, "orlando", "corredor", "orlando@gmail.com", "$2a$10$BrprotO/cVqNsyZ4XlIn3O1jg8gxOZrAq3oRWQM1R7Ze9wL.iO4ci", "imagen1644979484561.png", 3)`; 

            const sql8LlenarTablaTipoUsuario = `INSERT INTO TipoUser (id, tipo_user) 
            VALUES 
                (1, "master"),
                (2, "admin"),
                (3, "comprador")`;

            connection.query(sql5Usuarios, function (err, result) {
                    if(!err){
                        console.log("Tabla Usuarios creada con exito");
                    }else{
                        if(err.code){
                            console.log(err);
                        }
                    }
                });
            connection.query(sql6TipoUser, function (err, result) {
                    if(!err){
                        console.log("Tabla Tipo usuarios creada con exito");
                    }else{
                        if(err.code){
                            console.log(err);
                        }
                    }
                });   
                connection.query(sql7LlenarTablaUsuarios, function (err, result) {
                    if(!err){
                        console.log("Llenado de tabla usuario ok");
                    }else{
                        if(err.code){
                            console.log(err);
                        }
                    }
                }); 
                connection.query(sql8LlenarTablaTipoUsuario, function (err, result) {
                    if(!err){
                        console.log("Llenado de tabla tipo usuario ok");
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