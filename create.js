const db = require('./aprendendo')
    //Definindo as models
const ClienteSchema = db.mongoose.Schema({
    nome: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    cpf: {
        type: Number
    },
    telefone: {
        type: Number,
        require: true
    },
    nascimento: {
        type: Date
    },
    sexo: {
        type: String
    },
    endereco: {
        type: String
    },
    cidade: {
        type: String
    },
    estado: {
        type: String
    },
    cep: {
        type: Number
    }
})

const OrcamentoSchema = db.mongoose.Schema({
        peca: {
            type: String,
            require: true
        },
        compras: {
            type: Number,
            require: true
        },
        quantidade: {
            type: Number,
            require: true
        },
        lucro: {
            type: Number,
            require: true
        },
        venda: {
            type: Number,
            require: true
        },
        maodeobra: {
            type: Number
        },
        servicos: {
            type: String,
            require: true
        }
    })
    // Definindo as collections
db.mongoose.model('clientes', ClienteSchema)
db.mongoose.model('orcamentos', OrcamentoSchema)
module.exports = ({
    ClienteSchema: db.mongoose.model('clientes', ClienteSchema),

    OrcamentoSchema: db.mongoose.model('orcamentos', OrcamentoSchema)

})