const router = require('express').Router();

const { register, 
    login, 
    forgotPassword, 
    getSecurityQuestions, 
    saveSecurityQuestions, 
    validateSecurityQuestions } = require('./../controllers/userCtrl');

router
    .route('/register')
    .post(register);
    
router
    .route('/login')
    .post(login);

router
    .route('/forgotPassword')
    .post(forgotPassword);

router
    .route('/securityQuestions')
    .get(getSecurityQuestions)
    .post(saveSecurityQuestions)
    
router
    .route('/validateSecurityQuestions')
    .post(validateSecurityQuestions)
module.exports = router;