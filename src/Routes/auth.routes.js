const router = require('express').Router();
const { authController } = require('../Controllers');
const { verifyClientRegistration, loginVerification } = require('../Middlewares');

router.post('/login', [loginVerification.isUserExist]);
router.post('/register', [verifyClientRegistration.checkUserDuplication], authController.register);

module.exports = router;