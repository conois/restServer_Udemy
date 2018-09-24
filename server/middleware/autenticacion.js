const jwt = require('jsonwebtoken')

// ========================= 
// VERIFICAR TOKEN 
// ========================= 


/**
 * Funcion que recibe 3 parametros de entrada
 * el Request 
 * La respuesta 
 * y el next, que hará que se siga ejecutando el codigo que esta en la funcion que está llamando al middleware 
 */

let verificaToken = (req, res, next) => {

    //con .get rescato el header de la petición
    let token = req.get('token')

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            res.status(401).json({
                ok: false,
                err
            })
        }

        req.usuario = decoded.usuario
        next()

    })



}

// ========================= 
// VERIFICAR ADMIN_ROLE 
// ========================= 

let verificaAdminRole = ( req, res, next ) => {

    let usuario = req.usuario

    if(usuario.role === 'ADMIN_ROLE'){
        next()
    } else {
        res.json({
            ok: false, 
            err: {
                message: "el usuario no es administrador"
            }
        })
    }

}

module.exports = {
    verificaToken, 
    verificaAdminRole
}