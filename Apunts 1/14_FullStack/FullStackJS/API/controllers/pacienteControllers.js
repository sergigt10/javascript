// Controlador de la app
// Tendremos diferentes funciones que se van associar al modelo y el routing

// Importamos el modelo
const Paciente = require('../models/Paciente');

// Cuando se crea un nuevo cliente
exports.nuevoCliente = async (req, res, next )  => {
    // Insertar en la base de datos
    // req.body -> permite leer los datos de un input, etc...
    // Crear objeto de paciente con datos de req.body
    // req.body se activa con el bodyParser
    const paciente = new Paciente(req.body);
    // Ponemos dentro de un try catch para controlar en caso de error.
    try {
        // Método save() para guardar en mongoose
        await paciente.save();
        // Respuesta del servidor
        res.json({ mensaje : 'El cliente se agregó correctamente'});
    } catch (error) {
        console.log(error);
        // Corre la siguiente función si hay un error
        next();
    }
}

// Obtiene todos los pacientes
exports.obtenerPacientes = async (req, res, next) => {
    try {
        // Para traer todos los registros usamos .find() -> método de mongoose.
        const pacientes = await Paciente.find({});
        // Respuesta del servidor
        res.json(pacientes);
    } catch (error) {
        console.log(error);
        next();
    }
}

// Obtiene un paciente en especifico por su ID
exports.obtenerPaciente = async (req, res, next) => {
    try {
        const paciente = await Paciente.findById(req.params.id);
        res.json(paciente);
    } catch (error) {
        console.log(error);
        next();
    }
}

// Actualiza un registro por su ID
exports.actualizarPaciente = async (req, res, next) => {
    try {
        // Busca y actualiza
        const paciente = await Paciente.findOneAndUpdate({_id : req.params.id}, req.body, {
            new: true
        });
        res.json(paciente);
    } catch (error) {
        console.log(error);
        next();
    }
}

// Elimina un paciente por su id
exports.eliminarPaciente = async(req, res, next) => {
    try {
        await Paciente.findOneAndDelete({_id : req.params.id});
        res.json({mensaje: 'El paciente fue eliminado'})
    } catch (error) {
        console.log(error);
        next();
    }
}