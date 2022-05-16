const express = require('express');
const EventController = require('../Controllers/Event.controller');
const router = express.Router();

router.get('/', EventController.getAllEvents);
router.post('/', EventController.createEvent);
router.get('/:id');
router.put('/:id');
router.delete('/:id');

module.exports = router;