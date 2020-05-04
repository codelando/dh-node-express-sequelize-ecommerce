const express = require('express');
const controller = require('../controllers/usersController');
const router = express.Router();

const guestRoute = require('../middlewares/guestRoute');
const userRoute = require('../middlewares/userRoute');

router.get('/register', guestRoute, controller.register);

router.get('/login', guestRoute, controller.login);

router.post('/login', guestRoute, controller.autenticate);

router.get('/logout', controller.logout);

router.get('/profile', userRoute, controller.profile);

router.post('/', controller.store);

module.exports = router;