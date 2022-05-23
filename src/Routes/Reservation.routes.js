const { Router } = require("express");
const { reservationController } = require("../Controllers");
const { authorizationJwt, reservationChecking } = require("../Middlewares");

const router = Router();

router.get('/',
    [
        authorizationJwt.verifyToken,
        authorizationJwt.isAccountOwnerOrAdmin
    ],
    reservationController.fetchAllReservations);
router.post(
    '/', 
    [
        authorizationJwt.verifyToken,
        reservationChecking.isPlaceAlreadyBooked,
        reservationChecking.doesUserReachMaxBookedPlace
    ],
    reservationController.insertReservation
);
router.post(
    '/:id/payment',
    reservationController.reservationPayment
)

module.exports = router;