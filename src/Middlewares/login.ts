import { NextFunction, Request, Response } from "express";
import { Event } from "../Types";

const { client } = require('../Models');

export const loginVerification = {

    checkAllFields: (req: Request, res: Response, next: NextFunction): Response | void => {
        if(!req.body.email || !req.body.password) {
            return res.status(400).json({
                message: 'All fields should be filled.'
            });
        }else{
            next();
        }
    },
    
    isUserExist: (req: Request, res: Response, next: NextFunction): void => {
        client.findOne({
            where: {
                email: req.body.email
            }
        })
        .then( (event: Event): Response | void => {
            if(!event){
                return res.status(404).json({
                    message: 'User not found. Check your email !!'
                });
            }else{
                next();
            }
        })
    }
}