const deletar = require('./categoria')
const del = deletar.categoriaSchema
module.exports = {
    async deletarCategoria(req, res) {
        del.deleteOne({ _id: req.body.id })
            .then(() => {
                req.flash("success_msg", "Categoria deletada com sucesso!")
                res.redirect("/admin/categorias")
            }).catch((err) => {
                req.flash("error_msg", "Categoria não pode ser deletada")
                res.redirect("/admin/categorias")
            })
    }
}