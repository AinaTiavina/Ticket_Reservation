import { NextFunction, Request, Response } from "express";
import { Client } from "../Types";

const { client } = require('../Models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../Config/auth.config');

module.exports = {

    register: (req: Request, res: Response, next: NextFunction) => {
        bcrypt.hash(req.body.password, 8)
        .then( (hash: string): void => {
            client.create({
                codeCli: "C_"+req.body.phone,
                lastName: req.body.lastName,
                firstName: req.body.firstName,
                email: req.body.email,
                roles: req.body.roles ? req.body.roles.split(';') : ['USER'],
                password: hash,
                phone: req.body.phone,
                cardNumber: req.body.cardNumber
            })
            .then( (): Response => res.status(201).json({
                message: 'The client was registered successfully.'
            }))
            .catch( (err: any): Response => res.status(400).json({
                error: err
            }))
        })
        .catch( (err: any): Response => res.status(500).json({
            error: err.message
        }));
    },

    authentication: (req: Request, res: Response, next: NextFunction) => {
        
        client.findOne({
            where: {
                email: req.body.email
            }
        })
        .then( (user: Client): void => {
            bcrypt.compare(req.body.password, user.password)
                .then( (valid: boolean): Response => {
                    if(!valid){
                        return res.status(401).json({
                            message: "Invalid password."
                        });
                    }

                    return res.status(200).json({
                        email: user.email,
                        roles: user.roles,
                        token: jwt.sign(config.data(user), config.secret, {
                            expiresIn: 10800            // 3 hours
                        })
                    });
                })
                .catch( (err: any): Response => res.status(500).json(err) )
        })
        .catch( (err: any): Response => res.status(500).json(err) )
    },

    refreshToken: (req: Request, res: Response, next: NextFunction) => {
        if( (req as any).clientEmail !== req.body.email){
            return res.status(401).json({
                message: "Some information are wrong !!!"
            });
        }

        client.findOne({
            where: {
                email: (req as any).clientEmail
            }
        })
        .then( (client: Client): Response => {

            return res.status(200).json({
                    email: client.email,
                    newToken: jwt.sign(config.data(client), config.secret, {
                    expiresIn: 10800            // 3 hours
                })
            });
        })
        .catch( (err: any): Response => res.status(400).json(err))
    }
}
