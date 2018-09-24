const express = require('express');
const app = express();
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 
const { verificaToken } = require('./../middleware/autenticacion')



app.post('/login', (req, res) => {

    let body = req.body

    Usuario.findOne({
        email: body.email
    }, (err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        //Para evaluar si existe el email en la base de datos
        if (!usuarioDB) {
            return res.status(400).json({
                ok: true,
                err: {
                    message: "Usuario o contraseña incorrectas "
                }
            })
        }

        /*
         * Evalua la contraseña para ver si coincide con la que tenemos en la base de datos 
         * Recibe dos parametros como entrada 
         * El primero es la contraseña que me estan ingresando 
         * El segundo es la contraseña con la que debo comparar
         * La funcion retorna un true o false  
         */
        if(!bcrypt.compareSync(body.password, usuarioDB.password)){
            return res.status(400).json({
                ok: true,
                err: {
                    message: "Usuario o contraseña incorrectas "
                }
            })
        }

        /**
         * Genero un token
         * Como primer parametro le paso la informacion que se transmita en el token
         * luego, irá la firma, esto es secreto
         * luego en cuanto expirará este token 
         */
        let token = jwt.sign({usuario: usuarioDB}, process.env.SEED, {expiresIn: process.env.EXPIRA_TOKEN })

        res.json({
            ok: true, 
            usuario: usuarioDB, 
            token
        })


    })
})


module.exports = app