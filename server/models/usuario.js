const mongoose = require('mongoose'); 
const uniqueValidator = require('mongoose-unique-validator'); 

let Schema = mongoose.Schema

//Definiré cuales son los valores que puede tomar rol. 
let roles ={
    values: ['ADMIN_ROLE', 'USER_ROLE'], 
    message: '{VALUE} no es un rol válido'
} 
//Defino las condiciones de mis llaves de la DB Usuario
let usuarioSchema = new Schema({
    nombre: {
        type: String, 
        required: [true,'el nombre es requerido'] 
    }, 
    email:{
        type: String,
        unique: true,
        required: [true, 'el email es requerido']
    }, 
    password: {
        type: String, 
        required: [true, 'la password es obligatoria']
    }, 
    img:{
        type: String,
        required: false
    }, 
    role:{
        type: String, 
        default: "USER_ROLE", 
        required: true, 
        enum: roles
    }, 
    estado: {
        type: Boolean,
        default: true, 
    }, 
    google: {
        type: Boolean, 
        dafault: false
    }
})

usuarioSchema.methods.toJSON = function () {
    let user = this; 
    let userObj = user.toObject(); 
    delete userObj.password

    return userObj
}


usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe ser unico' })


//Aca exporto con el nombre que yo requiera, en este caso "Usuario" que tendrá las propiedades de "usuarioSchema"
module.exports = mongoose.model('Usuario', usuarioSchema)
