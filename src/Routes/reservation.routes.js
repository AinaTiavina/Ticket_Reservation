const { Router } = require("express");
const { reservationController } = require("../Controllers");
const { authorizationJwt, reservationChecking } = require("../Middlewares");

const router = Router();

router.get('/', reservationController.fetchAllReservations);
router.post(
    '/', 
    [
        authorizationJwt.verifyToken,
        reservationChecking.isPlaceAlreadyBooked
    ],
    reservationController.insertReservation
);

module.exports = router;