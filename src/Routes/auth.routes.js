const router = require('express').Router();
const authController = require('../Controllers/auth.controller');
const { verifyUserInformation } = require('../Middlewares/register');

router.post('/login');
router.post('/register', [verifyUserInformation], authController.register);

module.exports = router;