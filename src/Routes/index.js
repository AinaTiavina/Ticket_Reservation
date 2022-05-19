const clientRoutes = require('./Client.routes');
const eventRoutes = require('./Event.routes');
const authenticationRoutes = require('./auth.routes');
const reservationRoutes = require('./reservation.routes');

module.exports = {
    clientRoutes,
    eventRoutes,
    authenticationRoutes,
    reservationRoutes
};