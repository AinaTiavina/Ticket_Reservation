require('dotenv').config();
const { reservation, event, client } = require('../Models');
const sendTicket = require('../Services/sendTicket.service');
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
                        sendTicket(req, _event, reservation)
                        .then(() => res.status(200).json({message: "done"}))
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