const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const db = require('../database/models');

module.exports = {
    profile: (req, res) => {
        res.render('users/profile');
    },
    register: (req, res) => {
        res.render('users/register');
    },
    store: (req, res) => {
        // Generamos el usuario a partir de los datos del request
        // - Ignoramos repassword
        // - Hasheamos la contraseña
        // - La categoría será siempre 'user' para el registro normal       

        user = {
            firstName:req.body.firstName,
            lastName: req.body.lastName,
            image: req.file ? req.file.filename : '',
            email:req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            categoryId: 1
        };
        
        db.user
            .create(user)
            .then((storedUser) => {
                return res.redirect('/');
            })
            .catch(error => console.log(error));
    },
    login: (req, res) => {
        res.render('users/login');
    },
    autenticate: (req, res) => {
        db.user
            .findOne({
                where: { email: req.body.email}
            })
            .then(user => {
                // Si el email existe
                if(user) {
                    // Y la contraseña es válida
                    if(bcrypt.compareSync(req.body.password, user.password)) {
                        // Eliminamos la contraseña antes de guardar en sesión
                        userData = user.dataValues;
                        delete userData.password
        
                        req.session.user = userData;
        
                        // Si pidió que recordar
                        if (req.body.remember) {
                            // Generamos un token seguro, eso para que no pueda entrar cualquiera
                            // https://stackoverflow.com/questions/8855687/secure-random-token-in-node-js
                            const token = crypto.randomBytes(64).toString('base64');
        
                            // Lo guardamos en nuestra base, para poder chequearlo luego
                            user.createToken({userId: user.id, token});
        
                            // Recordamos al usuario por 3 meses         msegs  segs  mins  hs   días
                            res.cookie('rememberToken', token, { maxAge: 1000 * 60  * 60 *  24 * 90 });
                        }
        
                        return res.redirect('/users/profile');
                    } else {
                        return res.render('users/login', {errors: {email: 'el usuario o la contraseña son inválidos' }, old: req.body}); 
                    }
                } else {
                    return res.render('users/login', {errors: {email: 'el usuario o la contraseña son inválidos' }, old: req.body });
                }
            });        
    },
    logout: async (req, res) => {
        // Borramos el registro de la base de datos si existe
        await db.token.destroy({
            where: { token: req.cookies.rememberToken}
        })

        // Destruimos la sesión
        req.session.destroy();
        // Destruimos la cookie de recordar
        res.cookie('rememberToken', null, { maxAge: -1 });
        // Redirigimos a la home
        res.redirect('/')
    }
}