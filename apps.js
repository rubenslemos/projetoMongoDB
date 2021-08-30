//carregar módulos
const express = require('express')
const handlebars = require('express-handlebars')
const bodyparser = require("body-parser")
const session = require('express-session')
const flash = require('connect-flash')
const mongoose = require('mongoose')
const app = express()
const admin = require('./routes/admin')
const usuarios = require('./routes/usuarios')
const path = require('path')
const moment = require("moment")
const Postagem = require('./models/read')
const Postagens = require('./models/Slug')
const Usuario = require('./models/Usuario')
const UserAdm = Usuario.Usuario
const eAdmin = require('./helpers/eAdmin')
const passport = require('passport')
require('./config/auth')(passport)
    //Session
app.use(session({
    secret: "cursodenode",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 30 * 60 * 1000 } //30min
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use(eAdmin.control)
    //Configurações

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//Handlebars

app.engine('handlebars', handlebars({
    defaultLayout: 'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
    helpers: {
        formatDate: (date) => {
            return moment(date).format('[Dia: ]DD/MM/YYYY [Hora: ]HH:mm')
        }
    }
}))
app.set('view engine', 'handlebars')

//Public

app.use(express.static(path.join(__dirname, "public")))

//Rotas

app.get('/', Postagem.listaIndex)
app.get('/404', (req, res) => { res.send('Erro 404!') })
app.use('/admin', admin)
app.use('/usuarios', usuarios)
app.get('/postagem/:slug', eAdmin.logado, Postagens.postagem)
app.get('/categorias/index', eAdmin.logado, Postagem.listaCategoriaUser)
app.get('/categorias/:slug', eAdmin.logado, Postagens.listarCategorias)
    //Outros

const PORT = process.env.PORT || 8081
app.listen(PORT, () => {
    console.log("Servidor Rodando")
})