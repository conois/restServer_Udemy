const express = require('express')
const mongoose = require('mongoose')
const app = express()
require('./config/config')
//para poder procesar la informacion que viene de las peticiones POST
const bodyParser = require('body-parser');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))
// parse application/json
app.use(bodyParser.json())

//requiero las rutas 
app.use(require('./routes/usuario'))

//Configurar la coneccion a la base de datos 
console.log("URL DE CONECCION: ", process.env.URLDB);
mongoose.connect(process.env.URLDB)
.then( ()=> { console.log("Base de datos online");})
.catch( error => {
    console.log("Error al conectar a la base de datos", error);
})

app.listen(process.env.PORT, () => {
    console.log("escuchando puerto: ", process.env.PORT);
})