const verifyClientRegistration = require('./register');
const loginVerification = require('./login');
const authorizationJwt = require('./authJwt');
const reservationChecking = require('./reservation');
const file = require('./fileUpload');

module.exports = {
    verifyClientRegistration,
    loginVerification,
    authorizationJwt,
    reservationChecking,
    file
};