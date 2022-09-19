require('dotenv').config();
import { NextFunction, Request, Response } from "express";
import { ConnectionError, Error } from "sequelize/types";
import { Client, Event, Reservation } from "../Types";
import paypal from "@paypal/checkout-server-sdk";
const { reservation, event, client } = require('../Models');
const sendTicket = require('../Services/sendTicket.service');
const stripe = require('stripe')(process.env.STRIPE_API_KEY);

export const reservationController = {

    fetchAllReservations: (req: Request, res: Response, next: NextFunction) => {
        const condition = req.query.isPayed && { payed: req.query.isPayed }

        reservation.findAll({
            where: condition,
            include: {
                model: client,
                attributes: {
                    exclude: "password"
                },
            }        
        })
        .then( (reservations: Reservation): Response => res.status(200).json(reservations))
        .catch( (err: ConnectionError) => res.status(500).json(err));
    },

    insertReservation: (req: Request, res: Response, next: NextFunction) => {
        
        client.findByPk((req as any).clientId)
            .then( (user: Client): void => {
                event.findByPk(req.query.event)
                    .then( (event: Event): void => {
                        reservation.create({
                            placeNumber: req.body.placeNumber,
                            ClientId: user.id,
                            EventId: event.id
                        })
                        .then( (reservation: Reservation): Response => res.status(201).json(reservation) )
                        .catch( (err: ConnectionError): Response => res.status(400).json(err) );
                    })
                    .catch( (): Response => res.status(400).json({
                        message: 'Event not found.'
                    }));    
                })
            .catch( (err: TypeError): Response => res.status(400).json(err) )
    },

    reservationPaymentWithStripe: (req: Request, res: Response, next: NextFunction) => {

        reservation.findByPk(req.params.id)
            .then( (_reservation: Reservation): void => {
                event.findByPk(_reservation.EventId)
                .then( async (_event: Event) => {
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
                            .catch( (err: Error): Response  => res.status(500).json(err))
                    } else {
                        return res
                            .status(400)
                            .json({ Error: "Something went wrong. Please try again later for One Time Payment" });
                    }
                })
            })
    },

    reservationPaymentWithPaypal: async(req: Request, res: Response, next: NextFunction) => {
        const env = new paypal.core.SandboxEnvironment(process.env.CLIENT_ID as string, process.env.CLIENT_SECRET as string);
        const client = new paypal.core.PayPalHttpClient(env);
        const request = new paypal.orders.OrdersCreateRequest;
        const reserv = await reservation.findByPk(req.params.id, {
            include: {
                model: event
            }      
        });
        request.requestBody({
            "intent": "CAPTURE",
            "purchase_units": [
                {
                    "amount": {
                        "currency_code": "USD",
                        "value": reserv.Event.cost
                    }
                }
            ]
        })
    }
}