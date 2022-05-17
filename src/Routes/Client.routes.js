const router = require('express').Router();
const ClientController = require('../Controllers/Client.controller');

router.get('/', ClientController.retrieveAllClients);
router.get('/:id', ClientController.retrieveOneClient);

module.exports = router;