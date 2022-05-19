const express = require('express');
const { eventController } = require('../Controllers');
const { authorizationJwt } = require('../Middlewares');
const router = express.Router();

router.get('/', eventController.getAllEvents);
router.post(
    '/', 
    [
        authorizationJwt.verifyToken, 
        authorizationJwt.isAdmin
    ], 
    eventController.createEvent
);

router.get('/:id', eventController.getSingleEvent);
router.put('/:id', eventController.updateEvent);
router.delete('/:id', eventController.deleteEvent);

module.exports = router;