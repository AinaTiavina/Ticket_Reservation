const router = require('express').Router();
const { clientController } = require('../Controllers');
const { authorizationJwt } = require('../Middlewares');

router.get(
    '/', 
    [
        authorizationJwt.verifyToken,
        authorizationJwt.isAdmin
    ],
    clientController.retrieveAllClients);
router.get(
    '/:id', 
    [
        authorizationJwt.verifyToken,
        authorizationJwt.isAccountOwnerOrAdmin
    ],
    clientController.retrieveOneClient);

module.exports = router;