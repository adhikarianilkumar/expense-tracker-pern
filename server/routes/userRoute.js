const router = require('express').Router();

const { register, login, forgotPassword } = require('./../controllers/userCtrl')

router
    .route('/register')
    .post(register);
    
router
    .route('/login')
    .post(login);

router
    .route('/forgotPassword')
    .post(forgotPassword);

module.exports = router;