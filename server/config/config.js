// ================== 
// PUERTO 
// ==================

process.env.PORT = process.env.PORT || 3000; 


// ================== 
// ENTORNO 
// ==================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev' ; 

// ================== 
// EXPIRACIÖN 
// ==================

process.env.EXPIRA_TOKEN = 60*60*34*30
// ================== 
// SEED 
// ==================

process.env.SEED = process.env.SEED || 'esta-es-mi-seed-super-seed'

// ================== 
// BASE DE DATOS 
// ==================

let urlDB

if (process.env.NODE_ENV === 'dev'){
    //localhost
    urlDB = 'mongodb://localhost:27017/cafe'
}

else {
    //servidor de base de datos online, en este caso mlab
    urlDB ='mongodb://cafe-user:admin123@ds263832.mlab.com:63832/cafe'
}

process.env.URLDB = urlDB

