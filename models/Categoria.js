const mongoose = require('./db')
    //Definindo as models
const categoriaSchema = new mongoose.mongoose.Schema({
        nome: {
            type: String,
            require: true
        },
        slug: {
            type: String,
            require: true
        },
        date: {
            type: Date,
            default: Date.now(),
            require: true
        }
    })
    // Definindo a collection
mongoose.mongoose.model('categorias', categoriaSchema)
module.exports = ({
    categoriaSchema: mongoose.mongoose.model('categorias', categoriaSchema)
})