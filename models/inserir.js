const criar = require("./categoria")
const Categoria = criar.categoriaSchema
const Categorias = (req, res) => {
    new Categoria({
        nome: req.body.nome,
        slug: req.body.slug
    }).save().then(() => {
        console.log("Salvo com sucesso")
    })
}
module.exports = {
    Categorias: Categorias
}

/*
const cliente = create.ClienteSchema
new cliente({
        nome: "Rubens",
        email: "rubenslemos@gmail.com",
        cpf: 06788715625,
        telefone: 31984562229,
        nascimento: 1982 - 10 - 06,
        sexo: "Masculino",
        endereco: "Rua Antero da Silveira 88 apto 202",
        cidade: "Belo Horizonte",
        estado: "Minas Gerais",
        cep: 30310050
    }).save().then(() => { console.log("Cliente Salvo com Sucesso") })
    .catch((err) => { console.log("Erro encontrado ao salvar cliente: " + err) }),

    module.exports = {
        cliente: cliente
    }
*/