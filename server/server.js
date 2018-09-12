const express = require('express')
const app = express()
require('./config/config')
//para poder procesar la informacion que viene de las peticiones POST
const bodyParser = require('body-parser'); 


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


app.get('/', function (req, res) {
    res.json('Hello World')
})

app.post('/usuario', function (req, res) {
    let persona = req.body; 

    if ( persona.nombre === undefined){
        res.status(400).json({
            ok: false, 
            mensaje: "El nombre es necesario para el registro"
        })
    }else {
        res.json(persona)
    }
})

app.put('/usuario/:id', function (req, res) {
    let id= req.params.id; 
    res.json({
        id,
    })
})

app.delete('/usuario', function (req, res) {
    res.json('Delete usuario')
  })

app.listen(process.env.PORT, () => {
    console.log("escuchando puerto: ", process.env.PORT);
})