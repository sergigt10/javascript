// Modelo interectua con la base de datos

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

// Definimos la tabla
// trim elimina los espacios
const pacientesSchema = new Schema({
    nombre: {
        type: String,
        trim: true,
    },
    propietario: {
        type: String,
        trim: true
    },
    fecha: {
        type: String,
        trim: true
    },
    telefono: {
        type: String,
        trim: true
    },
    hora: {
        type: String,
        trim: true
    },
    sintomas: {
        type: String,
        trim: true
    }
});

// Hacemos disponible el modelo para el controller
// Y creamos la tabla de la bd con el nombre paciente
module.exports  = mongoose.model('Paciente', pacientesSchema);
