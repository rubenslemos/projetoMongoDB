const express = require('express')
const router = express.Router()
const inserir = require('../models/inserir')
router.get('/', (req, res) => {
    res.render('admin/index')
})
router.get('/posts', (req, res) => {
    res.send('Pagina de posts')
})
router.get('/categorias', (req, res) => {
    res.render('admin/categorias')
})
router.get('/categorias/add', (req, res) => {
    res.render('admin/addcategorias')
})

router.post('/categorias/nova', inserir.Categorias)

module.exports = router