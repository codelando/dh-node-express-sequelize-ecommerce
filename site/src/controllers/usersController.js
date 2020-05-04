const bcrypt = require('bcryptjs');
const jsonDb = require('../database/jsonDatabase');
const userModel = jsonDb('users');

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
            email:req.body.email,
            password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
            category: 'user'
        };
        
        userId = userModel.create(user);

        res.redirect(`/`)
    },
    login: (req, res) => {
        res.render('users/login');
    },
    autenticate: (req, res) => {
        user = userModel.findByField('email', req.body.email);
        
        // El email existe
        if(user) {
            // La contraseña es válida
            if(bcrypt.compareSync(req.body.password, user.password)) {
                // Eliminamos la contraseña antes de guardar en sesión
                delete user.password

                req.session.user = user;

                return res.redirect('/users/profile')
            } else {
                return res.render('users/login', {errors: [{email: 'el usuario o la contraseña son inválidos' }]}); 
            }
        } else {
            return res.render('users/login', {errors: [{email: 'el usuario o la contraseña son inválidos' }]});
        }
    }
}