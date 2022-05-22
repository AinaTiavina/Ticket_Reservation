const jwt = require('jsonwebtoken');
const config = require('../Config/auth.config');
const { client } = require('../Models');

module.exports = {

    verifyToken: (req, res, next) => {

        const token = req.headers['authorization'];
        if(!token){
            return res.status(401).json({
                message: 'No token provided! You should log in first.'
            });
        }

        jwt.verify(token.split(' ')[1], config.secret, (err, decoded) => {
            if(err){
                return res.status(401).json({
                    message: 'Invalid or Expired token' 
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
                }else{
                    next();
                }
            })
            .catch( err => {
                return res.status(500).json({
                    message: err.message
                });
            });
        
    },

    isUser: (req, res, next) => {
        client.findByPk(req.clientId)
            .then( client => {
                if(!client.roles.includes('USER')){
                    return res.status(401).json({
                        message: "Your are not able to access this ressource"
                    })
                }else{

                    next();
                }
            })
            .catch( err => res.status(500).json({
                    message: err.message
            }));   
    },

    isAccountOwner: (req, res, next) => {
        client.findByPk(req.clientId)
            .then( client => {
                if(!client.roles.includes('ADMIN') && client.id  !== parseInt(req.params.id)){
                    return res.status(401).json({
                        message: 'You cannot access this ressource'
                    });
                }else{
                    next();
                }
            })
            .catch( err => res.status(400).json(err));
    }
}