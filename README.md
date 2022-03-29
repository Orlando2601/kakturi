# Cacturi Ideas
######  Market place to jewelry supplies. Make your self and improve your art and design. Natural stones, terminals gold and silver steel. 
###### By Oswar Baez

###### Paso 1 En la terminal ejecutar npm instal
###### Paso 2 Una vez termine de instalar nos dirigimos a cambiar user y password de la base de datos segun tengamos en nuestro ordenador, ingresando con ctrl + click sobre el link de abajop nos dirige al archivo de configuracion donde debemos cambiar {"username": "root", "password": ".."} del objeto como se muestra acontinuacion
 "development": {
    "username": "root",
    "password": "",
    "database": "cacturiDB",
    "host": "127.0.0.1",
    "dialect": "mysql"
  } 
  ###### Link [config](./src/database/config/config.js)

  ###### Paso 3 En la terminal ejecutamos el comando npm start 
  ###### Observaremos como se crearon base de datos, tablas, conexiones, y llenado de tablas por defecto
  ###### Paso 4 Ingresamos al siguiente link http://localhost:3000/
  ###### Paso 5 En el icono de usuario podemos acceder con los siguientes usuarios
  ###### MASTER: quien tiene permisos de gestion de usuarios y de productos
  ###### ADMIN: Quien tiene permisos de gestion de productos
  ###### COMPRADOR: Quien solo tiene permisos de visualizacion 
  ###### NO LOG: Quien solo tiene permisos de visualizacion 

  ###### MASTER: usuario: adminmaster@cacturi.com | contrasenia: 00000000
  ###### ADMIN: usuario: oswar@gmail.com | contrasenia: 00000000
  ###### COMPRADOR: usuario: orlando@gmail.com | contrasenia: 00000000




