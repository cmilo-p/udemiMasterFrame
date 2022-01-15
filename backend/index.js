'use strict';

const mongoose = require('mongoose');
var app = require('./app');
var port = 3900;

const URL = 'mongodb://localhost:27017/api_rest_blog';

/* Parámetro de Seguridad para las transacciones */
mongoose.Promise = global.Promise;

mongoose.connect(URL, { useNewUrlParser: true }).then(() => {
    console.log('¡Conexión a la base de datos correcta!');

    //Crear Servidor y escucha de peticiones HTTP
    app.listen(port, () => {
        console.log('Servidor corriendo en http://localhost:' + port);
    })
});
