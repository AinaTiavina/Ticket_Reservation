import express from 'express';
import { eventController } from '../Controllers';
import { authorizationJwt, file } from '../Middlewares';
const router = express.Router();

router.get('/', eventController.getAllEvents);
router.post(
    '/', 
    [
        authorizationJwt.verifyToken,
        authorizationJwt.isAdmin,
        file.single('img'), 
    ],
    eventController.createEvent
);

router.get('/:id', eventController.getSingleEvent);
router.put(
    '/:id', 
    [
        authorizationJwt.verifyToken,
        authorizationJwt.isAdmin,
        file.single('img')
    ], 
    eventController.updateEvent);
router.delete('/:id', eventController.deleteEvent);

module.exports = router;