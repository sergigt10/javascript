// Archivo principal de nuestro servidor "backend"

// Importamos express
const express = require('express');
// Importamos mongoose
const mongoose = require('mongoose');
// Importamos el routing
const routes = require('./routes');
// Para leer lo pasado por el cliente
const bodyParser = require('body-parser');
// Importamos CORS
const cors = require('cors');

// Crear el servidor
const app = express();

// Habilitar Cors
// Filtramos cors para que solo funcione con localhost las peticiones
const whitelist = ['http://localhost:3000'];
const corsOptions = {
    origin: (origin, callback) =>  {
        // console.log(origin);
        const existe = whitelist.some( dominio => dominio === origin);
        if ( existe ) {
            callback(null, true)
        } else {
            callback(new Error('No Permitido por CORS'))
        }
    }
}

// Habilitar cors
// .use -> son midelwares de express (son como ciertas partes disponibles que proporciona express)
// Permite filtrar solo disponible para un dominio
// app.use( cors(corsOptions) );
app.use(cors());

// Conectar a mongodb
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/veterinaria', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

// Habilitar el body-parser para leer lo pasado por el cliente y va a extraer esta información para que podamos manejar
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Habilitar routing
// Cuando visiten nuestro sitio web vamos a ejecutar la funcion de routes para habilitat el routing
app.use('/', routes())


// Puerto y arrancar el servidor
app.listen(4000, () => {
    console.log('Servidor funcionando')
})