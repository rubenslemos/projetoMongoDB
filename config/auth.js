const localStrategy = require('passport-local')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const Usuarios = require('../models/Usuario')
const Usuario = Usuarios.Usuario
module.exports = (passport) => {
    passport = passport.use(new localStrategy({ usernameField: 'email', passwordField: 'senha' }, (email, senha, done) => {
        Usuarios.Usuario.findOne({ email: email }).then((usuario) => {
            if (!usuario) {
                return done(null, false, { message: "Esta conta não existe" })
            }
            bcrypt.compare(senha, usuario.senha, (error, batem) => {
                if (batem) {
                    return done(null, usuario)
                } else {
                    return done(null, false, { message: "Senha Incorreta" })
                }
            })
        })
    }))
    passport.serializeUser((Usuario, done) => {
        done(null, Usuario.id)
    })
    passport.deserializeUser((id, done) => {
        Usuario.findById(id, (err, usuario) => {
            done(err, usuario)
        })
    })
}