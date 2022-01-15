'use strict'

// Cargar modulos node para crear el servidor
const express = require('express');
const cors = require('cors');

//Ejecutar express (http)
const app = express();

//ficheros de rutas
const article_routes = require('./routes/article');

//Middelwars
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//CORS
//cors permite las peticones desde culquier frontend
app.use(cors());

//Añadir prefijos a rutas
app.use('/api', article_routes);

//Exportar modulo (fichero actual)
module.exports = app;