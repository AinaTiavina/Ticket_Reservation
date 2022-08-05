import { NextFunction, Request, response, Response } from "express";
import { Client } from "../Types";

const jwt = require('jsonwebtoken');
const config = require('../Config/auth.config');
const { client } = require('../Models');

export const authorizationJwt = {

    verifyToken: (req: Request, res: Response, next: NextFunction) => {

        const token = req.headers['authorization'];
        if(!token){
            return res.status(401).json({
                message: 'No token provided! You should log in first.'
            });
        }

        jwt.verify(token.split(' ')[1], config.secret, (err: any, decoded: any) => {
            if(err){
                return res.status(401).json({
                    message: err.message 
                });
            }

            (req as any).clientId = decoded.id;
            (req as any).clientEmail = decoded.email;
            next();
        });
    },

    isAdmin: (req: Request, res: Response, next: NextFunction) => {
        client.findByPk((req as any).clientId)
            .then( (client: Client): Response | void => {
                if(!client.roles.includes('ADMIN')){
                    return res.status(401).json({
                        message: "Your status doesn't afford you to access this ressource"
                    })
                }else{
                    next();
                }
            })
            .catch( (err: any): Response => {
                return res.status(500).json({
                    message: err.message
                });
            });
        
    },

    isUser: (req: Request, res: Response, next: NextFunction) => {
        client.findByPk((req as any).clientId)
            .then( (client: Client): Response | void => {
                if(!client.roles.includes('USER')){
                    return res.status(401).json({
                        message: "Your are not able to access this ressource"
                    })
                }else{

                    next();
                }
            })
            .catch( (err: any): Response => res.status(500).json({
                    message: err.message
            }));   
    },

    isAccountOwnerOrAdmin: (req: Request, res: Response, next: NextFunction) => {
        client.findByPk((req as any).clientId)
            .then( (client: Client): Response | void => {
                if(!client.roles.includes('ADMIN') && client.id  !== parseInt(req.params.id)){
                    return res.status(401).json({
                        message: 'You cannot access this ressource'
                    });
                }else{
                    next();
                }
            })
            .catch( (err: any): Response => res.status(400).json(err));
    }
}