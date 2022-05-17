const router = require('express').Router();
const authController = require('../Controllers/auth.controller');

router.post('/login');
router.post('/register', authController.register);

module.exports = router;