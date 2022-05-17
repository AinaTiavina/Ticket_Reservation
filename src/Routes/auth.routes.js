const router = require('express').Router();
const { authController } = require('../Controllers');
const { verifyClientRegistration } = require('../Middlewares');

router.post('/login');
router.post('/register', [verifyClientRegistration.verifyUserInformation], authController.register);

module.exports = router;