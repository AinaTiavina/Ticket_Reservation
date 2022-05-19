const router = require('express').Router();
const { authController } = require('../Controllers');
const { verifyClientRegistration, loginVerification } = require('../Middlewares');

router.post(
    '/login', 
    [
        loginVerification.checkAllFields, 
        loginVerification.isUserExist,
    ],
    authController.authentication
);
router.post(
    '/register', 
    [
        verifyClientRegistration.checkUserDuplication,
        verifyClientRegistration.checkUserRoles
    ], 
    authController.register
);

module.exports = router;