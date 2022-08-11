import { Router } from "express";
import { reservationController } from "../Controllers";
import { authorizationJwt, reservationChecking } from "../Middlewares";

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
    '/:id/payment/stripe',
    [
        authorizationJwt.verifyToken,
        reservationChecking.isAlreadyPayed
    ],
    reservationController.reservationPayment
)

module.exports = router;