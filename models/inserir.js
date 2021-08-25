const criar = require("./categoria")
const novoPost = require('./Postagem')
const Categoria = criar.categoriaSchema
const Postagem = novoPost.Postagem
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
        res.render("../addcategorias", { erros: erros })
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
const Postagens = (req, res) => {
    var erros = []
    if (!req.body.titulo || typeof req.body.titulo == undefined || req.body.titulo == null) {
        erros.push({ texto: "Titulo Invalido" })
    }
    if (!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null) {
        erros.push({ texto: "Slug Invalido" })
    }
    if (!req.body.descricao || typeof req.body.descricao == undefined || req.body.descricao == null) {
        erros.push({ texto: "Titulo Invalido" })
    }
    if (!req.body.conteudo || typeof req.body.conteudo == undefined || req.body.conteudo == null) {
        erros.push({ texto: "Slug Invalido" })
    }
    if (req.body.titulo.length < 3) {
        erros.push({ texto: "Nome muito curto, favor digitar outro Nome" })
    }
    if (req.body.slug.length < 3) {
        erros.push({ texto: "Slug muito curto, favor digitar outro Slug" })
    }
    if (req.body.descricao.length < 3) {
        erros.push({ texto: "Descrição muito curta, favor digitar outra Descrição" })
    }
    if (req.body.conteudo.length < 3) {
        erros.push({ texto: "Conteúdo muito curto, favor inserir outro Conteúdo" })
    }
    if (req.body.categoria == "0") {
        erros.push({ texto: "Categoria invalida, registre uma categoria primeiro" })
    }
    if (erros.length > 0) {
        res.render("../addpostagem", { erros: erros })
    } else {
        new Postagem({
            titulo: req.body.titulo,
            slug: req.body.slug,
            descricao: req.body.descricao,
            conteudo: req.body.conteudo,
            categoria: req.body.categoria
        }).save().then(() => {
            req.flash("success_msg", "Postagem criada com sucesso!")
            res.redirect('../postagens')
        }).catch((err) => {
            req.flash("error_msg", "Algo saiu errado, tente novamente!")
            res.redirect('../postagens')
        })
    }
}
module.exports = {
    Categorias: Categorias,
    Postagens: Postagens
}