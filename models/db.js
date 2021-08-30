const mongoose = require('mongoose')
if (process.env.NODE_ENV == "production") {
    mongoose.connect("mongodb+srv://rubenslemos:Rumos1982@blogdonode.kxnmn.mongodb.net/blogdonode", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // retryWrites = true,
            // w = majority
        })
        .then(() => {
            console.log("MongoDB Conectado...")
        }).catch((err) => {
            console.log("Erro ao conectar ao MongoDB: " + err)
        })

} else {
    mongoose.connect("mongodb://localhost/blogapp", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("MongoDB Conectado...")
    }).catch((err) => {
        console.log("Erro ao conectar ao MongoDB: " + err)
    })
}
module.exports = { mongoose: mongoose }