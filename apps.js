//carregar módulos
const express = require('express')
const handlebars = require('express-handlebars')
const bodyparser = require("body-parser")
const mongoose = require('mongoose')
const app = express()
    //Configurações
    //Body Parser
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
    //Handlebars
app.engine('handlebars', handlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
    //Mongoose
    //Em breve
    //Rotas

//Outros
const PORT = 8081
app.listen(PORT, () => {
    console.log("Servidor Rodando")
})