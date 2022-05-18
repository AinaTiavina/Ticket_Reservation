const verifyClientRegistration = require('./register');
const loginVerification = require('./login');
const authorizationJwt = require('./authJwt');

module.exports = {
    verifyClientRegistration,
    loginVerification,
    authorizationJwt
};