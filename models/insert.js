const create = require('./create')
const cliente = create.ClienteSchema
const item = create.OrcamentoSchema
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
    new item({
        peca: "Placa Mãe",
        compras: 500,
        quantidade: 1,
        lucro: 30,
        venda: 650,
        maodeobra: 150,
        servicos: "Instalação"
    }).save().then(() => { console.log("Item Salvo com Sucesso") })
    .catch((err) => { console.log("Erro encontrado ao salvar item: " + err) })