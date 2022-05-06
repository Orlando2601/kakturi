/* REQUERIMIENTO DE MODULOS ///////////////////////////////////////////////////////////////////////////// */
const express = require('express');
const path = require('path');
const {crearDB} = require('./src/database/config/conect');
const images = path.resolve(__dirname, './src/public/images');
const publicPath = path.resolve(__dirname, './src/public');
const session = require('express-session')
const cookies = require('cookie-parser')
const productsRouter = require('./src/routes/productsRouter');
const userRouter = require('./src/routes/userRouter');
const adminRouter = require('./src/routes/adminRouter');
const masterRouter = require('./src/routes/masterRouter');
const usersApiRouter = require('./src/routes/usersApiRouter')
const productsApiRouter = require('./src/routes/productsApiRouter');
const methodOverride = require('method-override')
const error404 = require('./src/middlewares/errorMiddleware')

const userLoggedMiddelware = require('./src/middlewares/userLoggedMiddleware')
const app = express();/* Asignar express a una variable */
/* /////////////////////////////////////////////////////////////////////////////////// */
crearDB()
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
app.use(userLoggedMiddelware)

app.set('views', path.resolve(__dirname, './src/views'))
app.use(express.static(publicPath));/* Expresamos la variable que express debe usar para archivos estáticos */
app.use(express.static(images));
/* app.use(logMiddleware) */
/* CONFIGURACION RENDERIZACION VISTAS //////////////////////////////////////////////////////////////*/
app.set('view engine', 'ejs'); /* Expresamos a express motor de vistas como ejs */
/* /////////////////////////////////////////////////////////////////////////////////////////////// */

/* CONFIGURACION PUERTO Y SERVIDOR///////////////////////////////////////////////////////////////// */
const port = process.env.PORT || 3001; /* Definimos la configuración del puerto en la variable port */
app.listen(port, () => { console.log('Servidor corriendo en el puerto' + port);});/* Abrimos puerto para visualizar /tambien es la configuración de heroku*/
/* //////////////////////////////////////////////////////////////////////////////////// */

/* RUTAS PRINCIPALES //////////////////////////////////////////////////////////////////////////// */
app.use(productsRouter); /* Definimos a express donde buscar las rutas */
app.use('/user',userRouter)
app.use('/admin',adminRouter)
app.use(masterRouter)
app.use('/api', usersApiRouter, productsApiRouter);

app.use(error404)
/* ///////////////////////////////////////////////////////////////////////////////////////////// */
module.exports = app;




