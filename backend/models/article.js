'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = Schema({
    title: String,
    content: String,
    date: { type: Date, default: Date.now },
    image: String
})

module.exports = mongoose.model('Article', articleSchema);

//mongoose.model(Nombre Coleccion, Schma):
// mongoose automaticamente pluralisa el nombre y crea la coleccion en la bd con la estructura.
