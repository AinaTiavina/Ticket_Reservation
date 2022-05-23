const router = require('express').Router();
const { authController } = require('../Controllers');
const { verifyClientRegistration, loginVerification, authorizationJwt } = require('../Middlewares');

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
router.post(
    '/refreshToken',
    [
        authorizationJwt.verifyToken
    ]
)

module.exports = router;