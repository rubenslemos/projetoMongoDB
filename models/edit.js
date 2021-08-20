const listar = require('./categoria')
const categorias = listar.categoriaSchema
module.exports = {
    async exibir(req, res) {
        exibir = categorias.findOne({ _id: req.params.id })
            .then((categoria) => {
                res.render("admin/edit", { categoria: categoria })
            }).catch((err) => {
                req.flash("error_msg", "Categoria não encontrada")
                res.redirect("/admin/categorias")
            })
    },
    async editar(req, res) {
        var erros = []
        if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
            erros.push({ texto: "Nome Invalido" })
        }
        if (!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null) {
            erros.push({ texto: "Slug Invalido" })
        }
        if (req.body.nome.length < 3) {
            erros.push({ texto: "Nome muito curto, favor digitar outro Nome" })
        }
        if (req.body.slug.length < 3) {
            erros.push({ texto: "Slug muito curto, favor digitar outro Slug" })
        }
        if (erros.length > 0) {
            res.render("../views/admin/categorias", { erros: erros })
        } else {
            editar = categorias.where({ _id: req.body.id })
                .updateOne({
                    nome: req.body.nome,
                    slug: req.body.slug,
                    date: Date.now()
                })
                .then(() => {
                    req.flash("success_msg", "Editado com sucesso")
                    res.redirect("/admin/categorias")
                }).catch((err) => {
                    req.flash("error_msg", "Erro ao editar categoria, tente novamente")
                    res.redirect("/admin/categorias")
                })
        }
    }
}