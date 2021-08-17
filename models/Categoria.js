const db = require('mongoose')
    //Definindo as models
const Schema = db.Schema
const Categoria = new Schema({
        nome: { type: String, require: true },
        slug: { type: String, require: true },
        date: { type: Date, default: Date.now(), require: true }
    })
    // Definindo a collection
Schema('categorias', Categoria)
module.exports = ({
    Categoria: Schema('categorias', Categoria),
})