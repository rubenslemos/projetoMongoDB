const criar = require('./categoria')
const novoPost = require('./Postagem')
const user = require('./Usuario')
const bcryptjs = require('bcryptjs')
const Categoria = criar.categoriaSchema
const Postagem = novoPost.Postagem
const Usuario = user.Usuario
const Categorias = (req, res) => {
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
        res.render("admin/addcategorias", { erros: erros })
    } else {
        new Categoria({
            nome: req.body.nome,
            slug: req.body.slug
        }).save().then(() => {
            req.flash("success_msg", "Categoria criada com sucesso!")
            res.redirect('admin/categorias')
        }).catch((err) => {
            req.flash("error_msg", "Algo saiu errado, tente novamente!")
            res.redirect('admin/categorias')
        })
    }
}
const Postagens = (req, res) => {
    var erros = []
    if (!req.body.titulo || typeof req.body.titulo == undefined || req.body.titulo == null) {
        erros.push({ texto: "Titulo Invalido" })
    }
    if (!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null || !req.body.slug.match(/^[0-9a-z]+$/)) {
        erros.push({ texto: "Slug vazio ou contendo carácter não alfanumérico" })
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
    if (req.body.slug.length < 2) {
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
        res.render("admin/addpostagem", { erros: erros })
    } else {
        new Postagem({
            titulo: req.body.titulo,
            slug: req.body.slug,
            descricao: req.body.descricao,
            conteudo: req.body.conteudo,
            categoria: req.body.categoria
        }).save().then(() => {
            req.flash("success_msg", "Postagem criada com sucesso!")
            res.redirect('admin/postagens')
        }).catch((err) => {
            req.flash("error_msg", "Algo saiu errado, tente novamente!")
            res.redirect('admin/postagens')
        })
    }

}
const Usuarios = async(req, res) => {
    var erros = []
    if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
        erros.push({ texto: "Nome Invalido" })
    }
    if (!req.body.email || typeof req.body.email == undefined || req.body.email == null) {
        erros.push({ texto: "Email Invalido" })
    }
    if (!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null) {
        erros.push({ texto: "Senha Invalida" })
    }
    if (req.body.senha != req.body.senha2) {
        erros.push({ texto: "Senha e Confirma Senha diferentes" })
    }
    if (req.body.nome.length < 3) {
        erros.push({ texto: "Nome muito curto, favor digitar outro Nome" })
    }
    if (req.body.email.length < 3) {
        erros.push({ texto: "email incorreto, favor digitar corretamente" })
    }
    if (req.body.senha.length < 3) {
        erros.push({ texto: "Senha muito curta, favor digitar outra Senha" })
    }
    if (erros.length > 0) {
        res.render("usuarios/registro", { erros: erros })
    } else {
        await Usuario.findOne({ email: req.body.email }).then((Usuario) => {
            if (Usuario) {
                erros.push({ texto: " E-mail já cadastrado " })
                res.redirect('/usuarios/registro')

            } else {
                const usuario = new user.Usuario({
                    nome: req.body.nome,
                    email: req.body.email,
                    eAdmin: req.body.eAdmin,
                    senha: req.body.senha
                })
                bcryptjs.genSalt(10, (erro, salt) => {
                    bcryptjs.hash(usuario.senha, salt, (erro, hash) => {
                        if (erro) {
                            req.flash("error_msg", "Algo saiu errado, tente novamente!")
                            res.redirect('/')
                        }

                        usuario.senha = hash
                        usuario.save()

                    })
                })
                usuario.save().then(() => {
                    req.flash("success_msg", "Usuario criado com sucesso!")

                    res.redirect('/usuarios/login')
                }).catch((err) => {
                    req.flash("error_msg", "Algo saiu errado, tente novamente!")
                    res.redirect('/usuarios/registro')
                })
            }

        }).catch((err) => {
            req.flash("error_msg", "Houve um erro interno")
            res.redirect('/')
        })
    }
}
module.exports = {
    Categorias: Categorias,
    Postagens: Postagens,
    Usuarios: Usuarios
}