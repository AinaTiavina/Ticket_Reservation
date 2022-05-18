const jwt = require('jsonwebtoken');
const config = require('../Config/auth.config');
const { client } = require('../Models');

module.exports = {

    verifyToken: (req, res, next) => {

        const token = req.headers['Authorization'].split(' ')[1];
        if(!token){
            return res.status(401).json({
                message: 'No token provided! You should log in first.'
            });
        }

        jwt.verify(token, config.secret, (err, decoded) => {
            if(err){
                return res.status(401).json({
                    message: 'Invalid token' 
                });
            }

            req.clientId = decoded.id;
            next();
        });
    },

    isAdmin: (req, res, next) => {

        client.findByPk(req.clientId)
            .then( client => {
                if(!client.roles.includes('ADMIN')){
                    return res.status(401).json({
                        message: "Your status doesn't afford you to access this ressource"
                    })
                }
            })
            .catch( err => {
                return res.status(500).json({
                    message: err.message
                });
            });
        next();
    },

    isUser: (req, res, next) => {
        client.findByPk(req.clientId)
            .then( client => {
                if(!client.roles.includes('USER')){
                    return res.status(401).json({
                        message: "Your status doesn't afford you to access this ressource"
                    })
                }
            })
            .catch( err => {
                return res.status(500).json({
                    message: err.message
                });
            });
        next();    
    }
}