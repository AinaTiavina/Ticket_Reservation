import { NextFunction, Request, Response } from "express";
import { Client } from "../Types";

const { client } = require('../Models');
const { Op } = require('sequelize');

export const verifyClientRegistration = {

    checkUserDuplication: (req: Request, res: Response, next: NextFunction): void => {
        client.findOne({
            where: {
                [Op.or]: [
                    {email: req.body.email},
                    {phone: req.body.phone},
                    {cardNumber: req.body.cardNumber}
                ]
            }
        })
        .then( (client: Client): Response | void => {
            if(client){
                return res.status(400).json({
                    message: 'User already exists.'
                })
            }

            next();
        })
    },

    checkUserRoles: (req: Request, res: Response, next: NextFunction) => {
        if(req.body.roles){
            const roles = req.body.roles.split(';');
        
            roles.forEach((element: string): Response | void => {
                if(element !== 'USER' && element !== 'ADMIN'){
                    return res.status(400).json({
                        message: 'Roles should contains USER or/and ADMIN value'
                    })
                }
            });
        }
        next();
    }
}