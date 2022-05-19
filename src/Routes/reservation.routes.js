const { Router } = require("express");
const { reservationController } = require("../Controllers");

const router = Router();

router.get('/', reservationController.fetchAllReservations);
router.post('/');

module.exports = router;