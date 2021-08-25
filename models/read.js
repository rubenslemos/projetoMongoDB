const listar = require('./categoria')
const listaPost = require('./Postagem')
module.exports = {
    async listacategoria(req, res) {
        listacategoria = await listar.categoriaSchema.find()
            .sort({ date: 'desc' }).then((categorias) => {
                res.render('admin/categorias', { categorias: categorias })
            }).catch((err) => {
                req.flash("error_msg", "Houve um erro ao exibir as categorias")
            })
    },
    async enviarCategorias(req, res) {
        enviarCategorias = await listar.categoriaSchema.find().then((categorias) => {
            res.render('admin/addcategorias', { categorias: categorias })
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro ao carregar o formulário")
            res.redirect('admin/categorias')
        })
    },
    async listaPostagem(req, res) {
        listaPostagem = await listaPost.Postagem.find().populate("categoria")
            .sort({ data: 'desc' }).then((postagens) => {
                res.render('admin/postagens', { postagens: postagens })
            }).catch((err) => {
                req.flash("error_msg", "Houve um erro ao exibir as categorias")
            })
    },
    async enviarPostagens(req, res) {
        enviarPostagens = await listar.categoriaSchema.find().then((categorias) => {
            res.render('admin/addpostagem', { categorias: categorias })
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro ao carregar o formulário")
            res.redirect('admin/postagens')
        })
    }
}