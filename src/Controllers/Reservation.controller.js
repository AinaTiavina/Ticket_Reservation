require('dotenv').config();
const { reservation, event, client } = require('../Models');
const sendTicket = require('../Services/sendTicket.service');
const config = require('../Config/auth.config');
const stripe = require('stripe')(process.env.STRIPE_API_KEY);

module.exports = {

    fetchAllReservations: (req, res, next) => {
        const condition = req.query.isPayed ? {
            where: { payed: req.query.isPayed }
        } : {}

        reservation.findAll(condition)
        .then( reservations => res.status(200).json(reservations))
        .catch( err => res.status(500).json(err));
    },

    insertReservation: (req, res, next) => {
        
        client.findByPk(req.clientId)
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
    },

    reservationPayment: (req, res, next) => {

        reservation.findByPk(req.params.id)
            .then( _reservation => {
                event.findByPk(_reservation.EventId)
                .then( async _event => {
                    const cardToken = await stripe.tokens.create({
                        card: {
                            ...req.body
                        },
                    });
                    
                    const charge = await stripe.charges.create({
                        amount: _event.cost*100,
                        currency: "eur",
                        source: cardToken.id,
                        receipt_email: 'rajoelisonainatiavina@gmail.com',
                        description: `Stripe Charge Of Amount $${_event.cost} for One Time Payment`,
                    });

                    if (charge.status === "succeeded") {
                        await reservation.update({
                            payed: true
                        }, {
                            where: {
                                id: req.params.id
                            }
                        });

                        sendTicket(req, _event, _reservation)
                            .then(() => res.status(200).json({
                                    message: "The ticket was sent to your email.",
                                    paymentConfirmationUrl: charge.receipt_url
                                }))
                            .catch( err => res.status(500).json(err))
                    } else {
                        return res
                            .status(400)
                            .json({ Error: "Something went wrong. Please try again later for One Time Payment" });
                    }
                })
            })
    }
}