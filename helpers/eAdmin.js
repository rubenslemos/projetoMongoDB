module.exports = {
    logado: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next()
        }
        req.flash('error_msg', "Area restrita para usuários")
        res.redirect('/')
    },
    eAdmin: (req, res, next) => {
        if (req.isAuthenticated() && req.user.eAdmin === 1) {
            return next()
        }
        req.flash('error_msg', "Area restrita para Administradores")
        res.redirect('/')
    },
    control: (req, res, next) => {
        res.locals.success_msg = req.flash("success_msg")
        res.locals.error_msg = req.flash("error_msg")
        res.locals.error = req.flash("error")
        res.locals.user = req.user || null
        res.locals.admin = null
        next()
        if (res.locals.user != null) {
            if (res.locals.user.eAdmin == 1) {
                res.locals.admin = res.locals.user
            } else {
                res.locals.admin = null
            }
        }
    }
}