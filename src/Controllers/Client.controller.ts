import { NextFunction, Request, Response } from "express";
import { Client } from "../Types";

const { client } = require('../Models');

export const clientController = {

    retrieveAllClients: (req: Request, res: Response, next: NextFunction) => {
        client.findAll({
            attributes: {
                exclude: 'password'
            },
        })
        .then( (clients: Client): Response => res.status(200).json(clients))
        .catch( (err: any): Response => res.status(400).json(err))
    },

    retrieveOneClient: (req: Request, res: Response, next: NextFunction) => {
        client.findByPk(req.params.id)
            .then( (client: Client): Response => res.status(200).json(client) )
            .catch( (err: any): Response => res.status(400).json(err) )
    }
}