'use strict'
const validator = require('validator');
const fs = require('fs');
const path = require('path');

const Article = require('../models/article');

var controller = {

    datosCurso: (req, res) => {

        var hola = req.body.hola;

        return res.status(200).send({
            curso: 'Master en Frameworks',
            autor: 'Victor Robles',
            hola
        })
    },

    test: (req, res) => {
        return res.status(200).send({
            message: 'Accion <<test>> del controllador de articulos'
        });
    },

    save: (req, res) => {
        // recoger parametros por post
        var params = req.body;

        // Validar datos (validator)
        try {
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);

        } catch (error) {
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos por enviar!!!'
            })
        }

        if (validate_title && validate_content) {

            // Crear el objeto a guardar
            var article = new Article();

            // Asignar valores
            article.title = params.title;
            article.content = params.content;
            article.image = null;

            // Guardar el articulo
            article.save((err, articleStored) => {

                if (err || !articleStored) {
                    return res.status(404).send({
                        status: 'Error',
                        message: 'El usuario no se ha almacenado!!!'
                    });
                }

                // Devolver una respuesta
                return res.status(200).send({
                    status: 'success',
                    article: articleStored
                });

            });
        } else {
            return res.status(200).send({
                status: 'error',
                message: 'Los datos no son válidos'
            });
        }

    },

    getArticles: (req, res) => {

        var query = Article.find({});

        // Limitar la cantidad de articulos a mostrar
        var last = req.params.last

        if (last || last != undefined) {
            query.limit(5);
        }

        // Find
        // método sort('guion para indicar forma descendente' 'Nombre_campo') para indicar el orden
        query.sort('-_id').exec((err, articles) => {

            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al devolver los articulos !!!'
                });
            }

            if (!articles) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay articulos para mostrar !!!'
                });
            }

            return res.status(200).send({
                status: 'success',
                articles
            });

        });

    },

    getArticle: (req, res) => {

        // Recorger el id de la url
        var articleId = req.params.id;

        // Comprobar que existe
        if (!articleId || articleId == null) {
            return res.status(404).send({
                status: 'error',
                message: 'No existe el articulo !!!'
            });
        }

        // Buscar el articulo
        Article.findById(articleId, (err, article) => {

            if (err || article.length === 0) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe el articulo !!!'
                });
            }

            // Devolver en JSON
            return res.status(200).send({
                status: 'success',
                article
            });
        });
    },

    update: (req, res) => {
        //Recoger el id del articulo por la url
        var articleId = req.params.id

        // Recoger los datos que llegan por PUT
        var params = req.body;

        // Validar datos
        try {
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);
        } catch (error) {
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos por enviar !!!'
            });
        }

        if (validate_title && validate_content) {
            // findAndUpdate
            //({id del articulo}, parámetros para actualizar, {new:true}parámetro de opciones<Devuelve el objeto actualizado>, callback para validar y responder)
            Article.findOneAndUpdate({ _id: articleId }, params, { new: true }, (err, articleUpdated) => {
                if (err) {
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al actualizar !!!'
                    });
                }

                if (!articleUpdated) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'No existe el articulo !!!'
                    });
                }

                return res.status(200).send({
                    status: 'success',
                    article: articleUpdated
                });

            });
        } else {
            // Devolver respuesta
            return res.status(200).send({
                status: 'error',
                message: 'La validación no es correcta !!!'
            });
        }
    },

    delete: (req, res) => {
        // Recoger la id del articulo por la url
        var articleId = req.params.id

        // findAndDelete
        Article.findOneAndDelete({ _id: articleId }, (err, articleRemoved) => {
            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al borrar !!!'
                });
            }

            if (!articleRemoved) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No se ha borrado el articulo, posiblemente no exista !!!'
                });
            }

            return res.status(200).send({
                status: 'success',
                article: articleRemoved
            });
        });
    },

    upload: (req, res) => {
        // Confgurar el modulo connect-multiparty(para gestonar archivos) (pasos en: "router/article.js")
        // Recoger el fichero de la petición
        var file_name = 'Imagen no subida...';

        if (!req.files) {
            return res.status(404).send({
                status: 'error',
                message: file_name
            });
        }

        // Conseguir el nombre y la extención del archivo
        // File0 es = al nombre del valor que se pasa por el fornt-end
        var file_path = req.files.file0.path;

        //metodo split separa el codigo segun el separador que se le pase al metodo mediante un String
        var file_split = file_path.split('\\');

        // ADVERTENCIA PARA LINUX O MAC EL SEPARADOR CAMBIA
        // var file_split = file_path.split('/');

        // Nombre del archivo
        var file_name = file_split[2];

        // Extencion del fichero
        var extension_split = file_name.split('\.');
        var file_ext = extension_split[1];

        // Comprovar la extención solo imagenes, si es valida borrar el fichero
        if (file_ext != 'png' && file_ext != 'jpg' && file_ext != 'jpeg' && file_ext != 'gif') {
            // Borrar el archivo
            // con la libreria fs y el metodo unlink(archivo a borrar, funcion())
            fs.unlink(file_path, (err) => {
                return res.status(200).send({
                    status: 'error',
                    message: 'La extención de la imagen no es válida !!!'
                });
            })
        } else {
            // Si todo es valido, obtener id del articulo por la url
            var articleId = req.params.id;

            //Buscar el articulo, asignarle el nombre de la imagen y actualizarlo
            Article.findOneAndUpdate({ _id: articleId }, { image: file_name }, { new: true }, (err, articleUpdated) => {
                if (err || !articleUpdated) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'Error al guardar la imagen del articulo !!!'
                    });
                }

                return res.status(404).send({
                    status: 'success',
                    article: articleUpdated
                });
            });
        }
    },// end upload file

    getImage: (req, res) => {
        var file = req.params.image;
        var path_file = './upload/articles/' + file;

        //Comprobar si la libreria existe con la libreria fs y el metodo existsSync(resive solo el paht del archivo)
        var exist = fs.existsSync(path_file);
        if (exist) {
            return res.sendFile(path.resolve(path_file));
        } else {
            return res.status(404).send({
                status: 'error',
                message: 'La imagen no existe !!!'
            });
        }
    },

    search: (req, res) => {
        // Sacar el string a buscar de la url
        var searchString = req.params.search;

        // Find $or (Metodo para buscar en la DB, segun varios parametros)
        Article.find({
            "$or": [
                { "title": { "$regex": searchString, "$options": "i" } },
                { "content": { "$regex": searchString, "$options": "i" } },
            ]
        })
            .sort([['date', 'descending']])
            .exec((err, articles) => {

                if (err) {
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error en la petición !!!'
                    });
                }

                if (!articles || articles.length <= 0) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'No hay articulos que coincidan con tu busqueda !!!'
                    });
                }

                return res.status(200).send({
                    status: 'succes',
                    articles
                });
            })
    }
}// End Controller

module.exports = controller;