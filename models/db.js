const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost/blogapp", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB Conectado...")
}).catch((err) => {
    console.log("Erro ao conectar ao MongoDB: " + err)
})

module.exports = {
    mongoose: mongoose
}