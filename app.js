const express = require('express');/* Importare modulo express */
const path = require('path');/* Importar moduylo path para las direcciones */
const app = express();/* Asignar express a una variable */
const publicPath = path.resolve(__dirname, './public');/* Definir la carpeta public como pública para archivos estáticos */
const port = process.env.PORT || 3000; /* Definimos la configuración del puerto en la variable port */
const indexRouter = require('./routes/mainRouter');/* requerimos archivo de rutas */
app.use(express.static(publicPath));/* Expresamos la variable que express debe usar para archivos estáticos */
app.listen(port, () => { console.log('Servidor corriendo en el puerto' + port);});/* Abrimos puerto para visualizar /tambien es la configuración de heroku*/
app.set('view engine', 'ejs'); /* Expresamos a express motor de vistas como ejs */
app.use(indexRouter); /* Definimos a express donde buscar las rutas */


