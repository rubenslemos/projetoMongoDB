const db = require('mongoose')
const Schema = db.Schema
    //Definindo as models
const ClienteSchema = new Schema({
    nome: { type: String, require: true },
    email: { type: String, require: true },
    cpf: { type: Number, require },
    telefone: { type: Number, require: true },
    nascimento: { type: Date },
    sexo: { type: String },
    endereco: { type: String },
    cidade: { type: String },
    estado: { type: String },
    cep: { type: Number }
})
const OrcamentoSchema = new Schema({
        peca: { type: String, require: true },
        compras: { type: Number, require: true },
        quantidade: { type: Number, require: true },
        lucro: { type: Number, require: true },
        venda: { type: Number, require: true },
        maodeobra: { type: Number },
        servicos: { type: String, require: true }
    })
    // Definindo as collections
Schema('clientes', ClienteSchema)
Schema('orcamentos', OrcamentoSchema)
module.exports = ({
    ClienteSchema: Schema('clientes', ClienteSchema),
    OrcamentoSchema: Schema('orcamentos', OrcamentoSchema)
})