const { Router } = require("express");
const { reservationController } = require("../Controllers");
const { authorizationJwt } = require("../Middlewares");

const router = Router();

router.get('/', reservationController.fetchAllReservations);
router.post(
    '/', 
    [
        authorizationJwt.verifyToken
    ],
    reservationController.insertReservation
);

module.exports = router;