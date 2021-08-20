const listar = require('./categoria')
module.exports = {
    async listacategoria(req, res) {
        listacategoria = await listar.categoriaSchema.find()
            .sort({ date: 'desc' }).then((categorias) => {
                res.render('admin/categorias', { categorias: categorias })
            }).catch((err) => {
                req.flash("error_msg", "Houve um erro ao exibir as categorias")
            })
    }
}