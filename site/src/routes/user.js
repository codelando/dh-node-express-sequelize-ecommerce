const express = require('express');
const multer = require('multer');
const path = require('path');

const controller = require('../controllers/usersController');
const router = express.Router();

const guestRoute = require('../middlewares/guestRoute');
const userRoute = require('../middlewares/userRoute');

// Configuramos la subida de archivos
const storage = multer.diskStorage({
    destination: path.resolve(__dirname, '../../public/images/users'),
    filename: (req, file, cb) => {
        cb(null, 'user-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

router.get('/register', guestRoute , controller.register);

router.get('/login', guestRoute, controller.login);

router.post('/login', guestRoute, controller.autenticate);

router.get('/logout', controller.logout);

router.get('/profile', userRoute, controller.profile);

// Cuando usamos más de un middleware, tenemos que ponerlos en un array
router.post('/', [guestRoute, upload.single('image')], controller.store);

module.exports = router;