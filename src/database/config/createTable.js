//modulos
const mysql = require('mysql2');
const { sequelize } = require('../models');
const config = require('./config')
const {username, password, database, host, dialect} = {...config.development}
//
// creacion de nueva tabla
// crear conexion con db

//

const crearTablas = ()=>{
  
        const connection = mysql.createConnection({
            host,
            user:username,
            password,
            database
        });

        connection.connect(function(error){
            if(error){
               return;
            }else{
               console.log('Conexion correcta.');
            }
         });
            let sql1Productos = `CREATE TABLE Productos(
                id INT PRIMARY KEY AUTO_INCREMENT,
                nombre VARCHAR(255) NOT NULL,
                descripcion VARCHAR(255) NOT NULL,
                imagen VARCHAR(255) NOT NULL,
                id_material INT NOT NULL,
                id_color INT NOT NULL)`;
             
            let sql2Material = `CREATE TABLE Material(
                id INT PRIMARY KEY AUTO_INCREMENT,
                tipo_material VARCHAR(255) NOT NULL)`;

            let sql3Colores = `CREATE TABLE Colores(
                id INT PRIMARY KEY AUTO_INCREMENT, 
                color VARCHAR(255) NOT NULL)`;

            //let sql4RelacionCarrito = "CREATE TABLE RelacionCarrito(id INT PRIMARY KEY AUTO_INCREMENT, id_producto INT NOT NULL, id_carrito INT NOT NULL)"
            connection.query(sql1Productos, function (err, result) {
                if(!err){
                    console.log("creada tabla 1 Productos")
                    return
                }else{
                    if(err.code === 1050){
                        console.log(' ya exite tabla 1 Productos')
                        return
                    }
                }
                
            })
            connection.query(sql2Material, function (err, result) {
                if(!err){
                    console.log("creada tabla 2 Material")
                    return
                }else{
                    if(err.code === 1050){
                        console.log(' ya exite tabla 2 Material')
                        return
                    }
                }
                
            })
            connection.query(sql3Colores, function (err, result) {
                if(!err){
                    console.log("creada tabla 3 Colores")
                    return
                }else{
                    if(err.code === 1050){
                        console.log(' ya exite tabla 3 Colores')
                        return
                    }
                }
                
            })
            /* connection.query(sql4RelacionCarrito, function (err, result) {
                if(!err){
                    console.log("creada tabla 4 Relacion Carrito")
                    return
                }else{
                    if(err.code === 1050){
                        console.log(' ya exite tabla 4 Relacion Carrito')
                        return
                    }
                }
                
            }) */
            
            
            
            connection.end();
    
                
  
    //
}


module.exports={
     crearTablas
}