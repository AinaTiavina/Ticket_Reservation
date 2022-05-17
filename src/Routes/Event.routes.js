const express = require('express');
const EventController = require('../Controllers/Event.controller');
const router = express.Router();

router.get('/', EventController.getAllEvents);
router.post('/', EventController.createEvent);
router.get('/:id', EventController.getSingleEvent);
router.put('/:id', EventController.updateEvent);
router.delete('/:id', EventController.deleteEvent);

module.exports = router;