const clientController = require('./Client.controller');
const eventController = require('./Event.controller');
const authController = require('./auth.controller');
const reservationController = require('./Reservation.controller');

module.exports = {
    clientController,
    eventController,
    authController,
    reservationController
}