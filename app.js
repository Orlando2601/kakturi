/* REQUERIMIENTO DE MODULOS ///////////////////////////////////////////////////////////////////////////// */
const express = require('express');
const path = require('path');
const publicPath = path.resolve(__dirname, './public');
const session = require('express-session')
const cookies = require('cookie-parser')
const productsRouter = require('./routes/productsRouter');
const userRouter = require('./routes/userRouter');
const adminRouter = require('./routes/adminRouter');
const methodOverride = require('method-override')
const logMiddleware = require('./middlewares/logMiddleware')
const app = express();/* Asignar express a una variable */
/* /////////////////////////////////////////////////////////////////////////////////// */

/* ALMACENAR DATOS DE NAVEGACION/////////////////////////////////////////////////////////////////// */
app.use(session({
    secret:'secreto oswar',
    resave:false,
    saveUninitialized: false
}));/* Configurar session de manera global */
app.use(cookies());/* Configurar cookies globalmente */
/* ///////////////////////////////////////////////////////////////////////////////////////////////// */

/* CONFIGURACION PARA EXTRAER INFORMACION DE LOS FORM///////////////////////////////////////////// */
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
/* /////////////////////////////////////////////////////////////////////////////////////////////// */

app.use(express.static(publicPath));/* Expresamos la variable que express debe usar para archivos estáticos */
app.use(logMiddleware)
/* CONFIGURACION RENDERIZACION VISTAS //////////////////////////////////////////////////////////////*/
app.set('view engine', 'ejs'); /* Expresamos a express motor de vistas como ejs */
/* /////////////////////////////////////////////////////////////////////////////////////////////// */

/* CONFIGURACION PUERTO Y SERVIDOR///////////////////////////////////////////////////////////////// */
const port = process.env.PORT || 3000; /* Definimos la configuración del puerto en la variable port */
app.listen(port, () => { console.log('Servidor corriendo en el puerto' + port);});/* Abrimos puerto para visualizar /tambien es la configuración de heroku*/
/* //////////////////////////////////////////////////////////////////////////////////// */

/* RUTAS PRINCIPALES //////////////////////////////////////////////////////////////////////////// */
app.use(productsRouter); /* Definimos a express donde buscar las rutas */
app.use('/user',userRouter)
app.use('/admin',adminRouter)
/* ///////////////////////////////////////////////////////////////////////////////////////////// */

module.exports = app;
