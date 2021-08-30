const listar = require('./categoria')
const listaPost = require('./Postagem')
const categorias = listar.categoriaSchema
const postagens = listaPost.Postagem
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
    editar(req, res) {
        var erros = []
        if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
            erros.push({ texto: "Nome Invalido" })
        }
        if (!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null || !req.body.slug.match(/^[0-9a-z]+$/)) {
            erros.push({ texto: "Slug vazio ou contendo carácter não alfanumérico" })
        }
        if (req.body.nome.length < 3) {
            erros.push({ texto: "Nome muito curto, favor digitar outro Nome" })
        }
        if (req.body.slug.length < 2) {
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
    },
    async exibirPost(req, res) {
        exibirPost = postagens.findOne({ _id: req.params.id }).then((postagens) => {
            categorias.find().then((categorias) => {
                res.render("admin/editPost", { categorias: categorias, postagens: postagens })
            }).catch((err) => {
                req.flash("error_msg", "Postagem não encontrada")
                res.redirect("/admin/postagens")
            })
        }).catch((err) => {
            req.flash("error_msg", "Postagem não encontrada")
            res.redirect("/admin/postagens")
        })
    },
    editarPost(req, res) {
        var erros = []
        if (!req.body.titulo || typeof req.body.titulo == undefined || req.body.titulo == null) {
            erros.push({ texto: "Titulo Invalido" })
        }
        if (!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null || !req.body.slug.match(/^[0-9a-z]+$/)) {
            erros.push({ texto: "Slug vazio ou contendo carácter não alfanumérico" })
        }
        if (!req.body.descricao || typeof req.body.descricao == undefined || req.body.descricao == null) {
            erros.push({ texto: "Descrição Invalido" })
        }
        if (!req.body.conteudo || typeof req.body.conteudo == undefined || req.body.conteudo == null) {
            erros.push({ texto: "Conteúdo Invalido" })
        }
        if (req.body.titulo.length < 3) {
            erros.push({ texto: "Título muito curto, favor digitar outro Título" })
        }
        if (req.body.slug.length < 2) {
            erros.push({ texto: "Slug muito curto, favor digitar outro Slug" })
        }
        if (req.body.descricao.length < 3) {
            erros.push({ texto: "Descrição muito curta, favor digitar outra Descrição" })
        }
        if (req.body.conteudo.length < 3) {
            erros.push({ texto: "Conteúdo muito curto, favor inserir outro Conteúdo" })
        }
        if (req.body.categorias == "0") {
            erros.push({ texto: "Categoria invalida, registre uma categoria primeiro" })
        }
        if (erros.length > 0) {
            res.render("admin/addpostagem", { erros: erros })
        } else {
            editarPost = postagens.where({ _id: req.body.id })
                .updateOne({
                    titulo: req.body.titulo,
                    slug: req.body.slug,
                    descricao: req.body.descricao,
                    conteudo: req.body.conteudo,
                    categoria: req.body.categoria,
                    data: Date.now()
                })
                .then(() => {
                    req.flash("success_msg", "Editado com sucesso")
                    res.redirect("../postagens")
                }).catch((err) => {
                    req.flash("error_msg", "Erro ao editar postagem, tente novamente")
                    res.redirect("admin/postagens")
                })
        }
    }
}