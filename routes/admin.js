const express = require('express')
const router = express.Router()
const inserir = require('../models/inserir')
const listar = require('../models/categoria')
const edit = require('../models/edit')
const deletar = require('../models/deletar')
const read = require('../models/read')
router.get('/', (req, res) => {
    res.render('admin/index')
})

router.get('/categorias', read.listacategoria)
router.get('/postagens', read.listaPostagem)

router.get('/categorias/add', (req, res) => {
    res.render('admin/addcategorias')
})
router.get('/postagens/add', read.enviarPostagens)

router.get('/categorias/edit/:id', edit.exibir)
router.post("/categorias/edit", edit.editar)
router.get('/postagens/editPost/:id', edit.exibirPost)
router.post('/postagens/editPost', edit.editarPost)

router.post("/categorias/deletar", deletar.deletarCategoria)
router.post('/postagens/deletar', deletar.deletarPostagem)

router.post('/categorias/nova', inserir.Categorias)
router.post('/postagens/nova', inserir.Postagens)


module.exports = router