const router = require('express').Router();
const { clientController } = require('../Controllers');

router.get('/', clientController.retrieveAllClients);
router.get('/:id', clientController.retrieveOneClient);

module.exports = router;