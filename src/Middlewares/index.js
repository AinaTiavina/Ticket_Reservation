const verifyClientRegistration = require('./register');
const loginVerification = require('./login');
const authorizationJwt = require('./authJwt');
const reservationChecking = require('./reservation');

module.exports = {
    verifyClientRegistration,
    loginVerification,
    authorizationJwt,
    reservationChecking
};