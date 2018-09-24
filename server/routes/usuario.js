const express = require('express');
const _ = require('underscore')
const app = express();
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const { verificaToken } = require('./../middleware/autenticacion')
const { verificaAdminRole } = require('./../middleware/autenticacion')



app.get('/usuarios', verificaToken ,(req, res) => {


    let desde = req.query.desde || 0
    desde = Number(desde)

    let limite = req.query.limite || 5
    limite = Number(limite)


    Usuario.find({estado: true})
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }


            Usuario.count({estado:true}, (error, conteo) => {
                if(error){
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }
                res.json({
                    ok: true,
                    usuarios, 
                    cuantos: conteo
                })
            })
        })
})

app.post('/usuario', [verificaToken, verificaAdminRole], function (req, res) {
    let persona = req.body;

    let usuarioDB = new Usuario({
        nombre: persona.nombre,
        email: persona.email,
        password: bcrypt.hashSync(persona.password, 10),
        role: persona.role
    })

    usuarioDB.save((err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        })
    })

})

//Actualizar un registro 
app.put('/usuario/:id', [verificaToken, verificaAdminRole], function (req, res) {
    //pongo las variables que si seran posible actualizar por medio del metodo put 
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'estado', 'role'])
    let id = req.params.id;

    Usuario.findByIdAndUpdate(id, body, {
        new: true,
        runValidator: true
    }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }


        res.json({
            ok: true,
            usuario: usuarioDB
        })

    })

})

app.delete('/usuario/:id', [verificaToken, verificaAdminRole], function (req, res) {
    let id = req.params.id

    let cambiaEstado= {
        estado: false
    }

    //Modifico el estado del registro en la base de datos a false, 
    Usuario.findByIdAndUpdate( id, cambiaEstado, {new: true}, (err, usuarioModificado) => {


        if (err) {
            return res.status(400).json({
                ok: false, 
                err
            })
        }



        res.json({
            ok: true, 
            usuario: usuarioModificado
        })


    })
/* 
    Usuario.findByIdAndRemove( id, (err, usuarioBorrado)=> {
        
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if(!usuarioBorrado){
            return res.status(400).json({
                ok: false,
                err:{
                    message: "El usuario no existe"
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        })
 */


})


module.exports = app