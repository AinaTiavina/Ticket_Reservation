const router = require('express').Router();
import { clientController } from '../Controllers';
const { authorizationJwt } = require('../Middlewares');

router.get(
    '/', 
    [
        authorizationJwt.verifyToken,
        authorizationJwt.isAdmin
    ],
    clientController.retrieveAllClients
);
router.get(
    '/:id', 
    [
        authorizationJwt.verifyToken,
        authorizationJwt.isAccountOwnerOrAdmin
    ],
    clientController.retrieveOneClient
);

module.exports = router;