const criar = require("./categoria")
const Categoria = criar.categoriaSchema
const Categorias = (req, res) => {
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
        res.render("../views/admin/addcategorias", { erros: erros })
    } else {
        new Categoria({
            nome: req.body.nome,
            slug: req.body.slug
        }).save().then(() => {
            req.flash("success_msg", "Categoria criada com sucesso!")
            res.redirect('../categorias')
        }).catch((err) => {
            req.flash("error_msg", "Algo saiu errado, tente novamente!")
            res.redirect('../categorias')
        })
    }
}
module.exports = {
    Categorias: Categorias
}