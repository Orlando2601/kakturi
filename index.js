const express = require('express');
const path = require('path');
const app = express();
const publicPath = path.resolve(__dirname, './public');
/* const port = 3000; */
app.use(express.static(publicPath));
/* app.listen(port, ()=> {console.log('Servidor corriendo en puerto ' + port)}); */
app.listen(process.env.PORT || 3000, () => { console.log('Servidor corriendo en el puerto 3000');});/* Configuracion heroku */

app.get('/', (req, res)=>{ res.sendFile(path.resolve(__dirname, './views/index.html'))});