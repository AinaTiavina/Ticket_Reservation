const router: Router = require('express').Router();
import { Router } from "express";
import { authController } from "../Controllers";
import { verifyClientRegistration, loginVerification, authorizationJwt } from '../Middlewares';

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
    
);
router.post(
    '/refreshToken',
    [
        authorizationJwt.verifyToken
    ],
    authController.refreshToken
)

module.exports = router;