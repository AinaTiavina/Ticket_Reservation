const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const config = require('../Config/auth.config');
const { event, reservation } = require('../Models');

module.exports = {

    isPlaceAlreadyBooked: (req, res, next) => {
        event.findByPk(req.query.event)
            .then(event => {
                reservation.findOne({
                    where: {
                        [Op.and]: {
                            EventId: event.id,
                            placeNumber: req.body.placeNumber
                        }
                    }
                })
                .then( reservation => {

                    if(reservation){
                        return res.status(400).json({
                            message: 'This place is already booked'    
                        })
                    }else{
                        next();
                    }
                })
                .catch( err => res.status(500).json(err))
            })
            .catch( err => res.status(400).json(err));       
    },

    doesUserReachMaxBookedPlace: (req, res, next) => {
        const token = req.headers['authorization'].split(' ')[1];

        jwt.verify(token, config.secret, (err, decoded) => {
            reservation.findAndCountAll({
                where: {
                    [Op.and]: {
                        ClientId: decoded.id,
                        EventId: parseInt(req.query.event)
                    }
                }
            })
            .then( (result => {
                
                if(result.count === 5) return res.status(401).json({
                    message: "You cannot book places over than 5 in a single event."
                });

                next();
            }))
            .catch( err => res.status(500).json(err))    
        });
    }
}