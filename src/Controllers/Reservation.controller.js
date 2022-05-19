const { reservation } = require('../Models');

module.exports = {

    fetchAllReservations: (req, res, next) => {
        reservation.findAll({
            attributes: {
                exclude: 'id'
            }
        })
        .then( reservations => res.status(200).json(reservations))
        .catch( err => res.status(500).json(err));
    }
}