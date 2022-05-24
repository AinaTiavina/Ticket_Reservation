require('dotenv').config();
const { reservation, event, client } = require('../Models');
const jwt = require('jsonwebtoken');
const config = require('../Config/auth.config');
const stripe = require('stripe')(process.env.STRIPE_API_KEY);

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
                                        success_url: `${req.protocol}://${req.get('host')}/Pages/success.html`,
                                        cancel_url: `${req.protocol}://${req.get('host')}/Pages/failure.html`,
                                    });
                    
                    return res.status(200).json({url: session.url});
                })
            })
    }
}