const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const user = require('../models/Usuario')
const insert = require('../models/inserir')
const login = require('../models/login')

require('passport')
require('../config/auth')
router.get('/registro', (req, res) => {
    res.render('usuarios/registro')
})
router.post('/registro', insert.Usuarios)
router.get('/login', (req, res) => {
    res.render('usuarios/login')
})
router.post('/login', login.login)
router.get('/logout', login.logout)
module.exports = router