const router = require('express').Router();
const ClientController = require('../Controllers/Client.controller');

router.get('/', ClientController.retrieveAllClients);
router.get('/:id');
router.post('/');

module.exports = router;