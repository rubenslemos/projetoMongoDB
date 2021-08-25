//carregar módulos
const express = require('express')
const handlebars = require('express-handlebars')
const bodyparser = require("body-parser")
const session = require('express-session')
const flash = require('connect-flash')
const mongoose = require('./models/db')
const app = express()
const admin = require('./routes/admin')
const path = require('path')
const moment = require("moment")
    //Session
app.use(session({
    secret: "cursodenode",
    resave: true,
    saveUninitialized: true
}))
app.use(flash())
app.use((req, res, next) => {
        res.locals.success_msg = req.flash("success_msg")
        res.locals.error_msg = req.flash("erro_msg")
        next()
    })
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
            return moment(date).format('DD/MM/YYYY HH:mm')
        }
    }
}))
app.set('view engine', 'handlebars')

//Public

app.use(express.static(path.join(__dirname, "public")))

app.get('/', (req, res) => {
    res.render('./admin/index')
})
app.get('/posts', (req, res) => {
    res.send('Lista Posts')
})
app.use('/admin', admin)

//Outros

const PORT = 8081
app.listen(PORT, () => {
    console.log("Servidor Rodando")
})