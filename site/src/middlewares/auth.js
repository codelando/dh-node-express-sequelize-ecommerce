jsonDB = require('../database/jsonDatabase');
userTokenModel = jsonDB('usersTokens');
userModel = jsonDB('users');


module.exports = (req, res, next) => {
    // Si el usuario está en sesion le pasamos la información a las vistas
    if (req.session.user) {
        res.locals.user = req.session.user;
    // Si el usuario tiene la cookie de recordar
    } else if (req.cookies.rememberToken) {
        let userToken = userTokenModel.findByField('token', req.cookies.rememberToken);

        // ...y la token existe en nuestra base
        if (userToken) {
            let user = userModel.find(userToken.userId);

            // ...y el usuario existe en base, lo logeamos
            if (user) {
                delete user.password;
                req.session.user = user;
                res.locals.user = user;
            }

        }
        
    }

    next();
}