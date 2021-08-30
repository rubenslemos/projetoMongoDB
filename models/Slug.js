const Postagens = require('./Postagem')
const Categorias = require('./categoria')
module.exports = {
    postagem(req, res) {
        Postagens.Postagem.findOne({ slug: req.params.slug }).then((postagem) => {
            if (postagem) {
                res.render('postagem/index', { postagem: postagem })
            } else {
                req.flash('error_msg', 'Postagem não existe')
                res.redirect('/')
            }
        }).catch((err) => {
            req.flash('error_msg', 'Postagem não existe')
            res.send('/')
        })
    },
    listarCategorias(req, res) {
        Categorias.categoriaSchema.findOne({ slug: req.params.slug }).then((categoria) => {
            if (categoria) {
                Postagens.Postagem.find({ categoria: categoria._id }).then((postagens) => {
                    res.render('categorias/postagens', { postagens: postagens, categoria: categoria })
                }).catch((err) => {
                    req.flash('error_msg', 'Erro ao listar posts')
                    res.redirect('/')
                })
            } else {
                req.flash('error_msg', 'Categoria não existe')
                res.redirect('/')
            }
        }).catch((err) => {
            req.flash('error_msg', 'Categoria não existe')
            res.redirect('/')
        })
    }
}