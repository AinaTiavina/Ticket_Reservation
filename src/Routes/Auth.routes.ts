const router: Router = require('express').Router();
import { Router } from "express";
import { authController } from "../Controllers";
import { verifyClientRegistration, loginVerification, authorizationJwt } from '../Middlewares';
import passport from 'passport';
import "../Controllers/oAuth.controller";
import { JwtGenerator } from "../Controllers/jwtGenerator";

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
    ],
    authController.refreshToken
);
router.get(
    '/auth/google',
    passport.authenticate('google', {scope: [ 'email', 'profile' ]})
);
router.get(
    '/auth/google/callback',
    passport.authenticate('google', { session: false }),
    JwtGenerator.generate
);

module.exports = router;