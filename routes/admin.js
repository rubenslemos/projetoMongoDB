const express = require('express')
const router = express.Router()
const inserir = require('../models/inserir')
const listar = require('../models/read')
const edit = require('../models/edit')
const deletar = require('../models/deletar')
router.get('/', (req, res) => {
    res.render('admin/index')
})
router.get('/posts', (req, res) => {
    res.send('Pagina de posts')
})

router.get('/categorias', listar.listacategoria)

router.get('/categorias/add', (req, res) => {
    res.render('admin/addcategorias')
})
router.get('/categorias/edit/:id', edit.exibir)
router.post("/categorias/edit", edit.editar)

router.post("/categorias/deletar", deletar.deletarCategoria)

router.post('/categorias/nova', inserir.Categorias)

module.exports = router