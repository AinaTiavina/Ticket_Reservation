const { Op } = require('sequelize');
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

        reservation.findAndCountAll({
            where: {
                [Op.and]: {
                    ClientId: req.clientId,
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
    },

    isAlreadyPayed: (req, res, next) => {
        reservation.findByPk(req.params.id)
            .then( _reservation => {
                if(_reservation && _reservation.payed === true){
                    return res.status(401).json({
                        message: "This reservation is already payed"
                    });
                }

                next();
            })
            .catch(err => res.status(400).json(err))
    }
}