const { Router } = require("express");
const { reservationController } = require("../Controllers");
const { authorizationJwt, reservationChecking } = require("../Middlewares");

const router = Router();

router.get('/', reservationController.fetchAllReservations);
router.post(
    '/', 
    [
        authorizationJwt.verifyToken,
        reservationChecking.isPlaceAlreadyBooked,
        reservationChecking.doesUserReachMaxBookedPlace
    ],
    reservationController.insertReservation
);

module.exports = router;