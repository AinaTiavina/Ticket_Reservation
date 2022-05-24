const { reservation, event, client } = require('../Models');
const jwt = require('jsonwebtoken');
const config = require('../Config/auth.config');
const stripe = require('stripe')('sk_test_51KxrbVHlCnziPo87nWN2cWdMCwyIFpqabSkhvVPetBkjArYhCjTpsRQvdPIrrcrloroVa6WeueKuUkTtXpsgiBOx00HvJojNmG');

module.exports = {

    fetchAllReservations: (req, res, next) => {
        reservation.findAll({
            attributes: {
                exclude: 'id'
            }
        })
        .then( reservations => res.status(200).json(reservations))
        .catch( err => res.status(500).json(err));
    },

    insertReservation: (req, res, next) => {
        const token = req.headers['authorization'].split(' ')[1];

        jwt.verify(token, config.secret, (err, decoded) => {
            client.findByPk(decoded.id)
            .then( user => {
                event.findByPk(req.query.event)
                    .then( event => {
                        reservation.create({
                            placeNumber: req.body.placeNumber,
                            ClientId: user.id,
                            EventId: event.id
                        })
                        .then( reservation => res.status(201).json(reservation) )
                        .catch( err => res.status(400).json(err) );
                    })
                    .catch( () => res.status(400).json({
                        message: 'Event not found.'
                    }));    
                })
            .catch( err => res.status(400).json(err) )
        })
    },

    reservationPayment: (req, res, next) => {

        reservation.findByPk(req.params.id)
            .then( reservation => {
                event.findByPk(reservation.EventId)
                .then( async _event => {
                    const session = await stripe.checkout.sessions.create({
                                        line_items: [
                                            {
                                                price_data: {
                                                    currency: 'eur',
                                                    product_data: {
                                                        name: _event.title,
                                                    },
                                                    unit_amount: _event.cost,
                                                },
                                                quantity: 1,
                                            },
                                        ],
                                        customer_email: req.clientEmail,
                                        mode: 'payment',
                                        success_url: 'https://example.com/success',
                                        cancel_url: 'https://example.com/cancel',
                                    });
                    
                    return res.status(200).json({url: session.url});
                })
            })
    }
}