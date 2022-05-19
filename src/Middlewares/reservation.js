const jwt = require('jsonwebtoken');
const config = require('../Config/auth.config');
const { event, client } = require('../Models');

module.exports = {

    isPlaceAlreadyBooked: (req, res, next) => {
        event.findByPk(req.query.event)
            .then(event => {
                event.getReservations()
                    .then( reservation => {
                        const booked = reservation.find(element => 
                            element.dataValues.placeNumber === req.body.placeNumber
                        );       
                        
                        if(booked){
                            return res.status(400).json({
                                message: 'This place is already booked'
                            });
                        }else{
                            next();
                        }
                    })
                    .catch( err => res.status(400).json(err))
            })
            .catch( err => res.status(400).json(err));       
    },

    DoesUserReachMaxBookedPlace: (req, res, next) => {
        const token = req.headers['authorization'].split(' ')[1];

        jwt.verify(token, config.secret, (err, decoded) => {
            client.findByPk(decoded.id)
                .then( client => {
                    client.getReservations()
                        .then( reservations => {
                            let i = 0
                            reservations.find( element => {
                                if(element.dataValues.EventId === parseInt(req.query.event)){
                                    i++;
                                }
                            }) 
                            
                            if(i === 5){
                                return res.status(401).json({
                                    message: "You cannot book places over than 5 in a single event."
                                })
                            }else{
                                next();
                            }
                        })
                })
        })
    }
}
