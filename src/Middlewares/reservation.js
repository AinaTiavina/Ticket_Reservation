const { reservation, event } = require('../Models');

module.exports = {

    isPlaceAlreadyBooked: (req, res, next) => {
        event.findByPk(req.query.event)
            .then(event => {
                event.getReservations()
                    .then( reservation => {
                        const booked = reservation.find(element => {
                                if(element.dataValues.placeNumber === req.body.placeNumber){
                                    return true;
                                }
                            });
                        
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
    }
}