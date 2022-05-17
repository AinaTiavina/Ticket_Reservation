const router = require('express').Router();
const { authController } = require('../Controllers');
const { verifyClientRegistration } = require('../Middlewares');

router.post('/login');
router.post('/register', [verifyClientRegistration.checkUserDuplication], authController.register);

module.exports = router;