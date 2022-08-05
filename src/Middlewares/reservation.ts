import { NextFunction, Request, Response } from "express";
import { Event, Reservation } from "../Types";

const { Op } = require('sequelize');
const { event, reservation } = require('../Models');

export const reservationChecking = {

    isPlaceAlreadyBooked: (req: Request, res: Response, next: NextFunction) => {
        event.findByPk(req.query.event)
            .then( (event: Event): void => {
                reservation.findOne({
                    where: {
                        [Op.and]: {
                            EventId: event.id,
                            placeNumber: req.body.placeNumber
                        }
                    }
                })
                .then( (reservation: Reservation): Response | void => {

                    if(reservation){
                        return res.status(400).json({
                            message: 'This place is already booked'    
                        })
                    }else{
                        next();
                    }
                })
                .catch( (err: any): Response => res.status(500).json(err))
            })
            .catch( (err: any): Response => res.status(400).json(err));       
    },

    doesUserReachMaxBookedPlace: (req: Request, res: Response, next: NextFunction) => {

        reservation.findAndCountAll({
            where: {
                [Op.and]: {
                    ClientId: (req as any).clientId,
                    EventId: parseInt(req.query.event as string)
                }
            }
        })
        .then( ( (result: any): Response | void => {        
                
            if(result.count === 5) return res.status(401).json({
                message: "You cannot book places over than 5 in a single event."
            });

            next();
        }))
        .catch( (err: any): Response => res.status(500).json(err))    
    },

    isAlreadyPayed: (req: Request, res: Response, next: NextFunction) => {
        reservation.findByPk(req.params.id)
            .then( (_reservation: Reservation): Response | void => {
                if(_reservation && _reservation.payed === true){
                    return res.status(401).json({
                        message: "This reservation is already payed"
                    });
                }

                next();
            })
            .catch((err: any): Response => res.status(400).json(err))
    }
}