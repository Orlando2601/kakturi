// modulos
const mysql = require('mysql2');
const config = require('./config')
const {crearTablas} = require('./createTable')
const {username, password, database, host} = {...config.development}

const crearDB = ()=>{
  
      const connection =  mysql.createConnection({
        host,
        user: username,
        password
      }); 

      connection.connect();
      
   
      try {
        connection.query("CREATE DATABASE " + database,(err, result)=> {!err? crearTablas():console.log("Ya existe")});
      } catch (err) {
        console.log(error)
      }

      connection.end();
   

  }
 //crearTablas()


module.exports = {
  crearDB
 
}