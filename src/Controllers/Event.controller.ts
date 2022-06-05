import { NextFunction, Request, Response } from "express";
import { Event } from "../Types";

const { event } = require('../Models')
const fs = require('fs');

module.exports = {

    getAllEvents: (req: Request, res: Response, next: NextFunction) => {
        
        event.findAll()
        .then( (events: Event): Response => res.status(200).json(events))
        .catch( (err: any): Response => res.status(400).json({ err }))
    },

    createEvent: (req: Request, res: Response, next: NextFunction) => {
        
        event.create({
            ...req.body,
            imageUrl: `${req.protocol}://${req.get('host')}/uploads/${(req as any).file.filename}`
        })
        .then( (event: Event): Response => res.status(201).json(event))   
        .catch( (err: any): Response => res.status(400).json({err}))
    },

    getSingleEvent: (req: Request, res: Response, next: NextFunction) => {
        
        event.findByPk(req.params.id)
            .then( (event: Event): Response => res.status(200).json({ event }))
            .catch( (err: any): Response => res.status(400).json({ err }))
        ;
    },

    updateEvent: (req: Request, res: Response, next: NextFunction) => {
        const newEvent = (req as any).file ? {
            ...req.body,
            imageUrl: `${req.protocol}://${req.get('host')}/uploads/${(req as any).file.filename}`  
        } : {...req.body};

        event.findByPk(req.params.id)
        .then( (_event: Event): void | Response => {
            if(_event){

                if((req as any).file){
                    const filename = _event.imageUrl.split('/uploads/')[1];
                    const imagePath = `${__dirname.split('/src')[0]}/public/uploads/${filename}`;
                    
                    fs.unlink(imagePath, () => {
                        event.update(newEvent, {
                            where: {
                                id: req.params.id
                            }
                        })
                        .then( (): Response => {
                    
                            return res.status(200).json({
                                message: 'The ressource was updated successfully'
                            })
                        })
                        .catch( (err: any): Response => res.status(400).json({ err }))
                    });
                } else{
                    event.update(newEvent, {
                        where: {
                            id: req.params.id
                        }
                    })
                    .then( (): Response => {
                
                        return res.status(200).json({
                            message: 'The ressource was updated successfully'
                        })
                    })
                    .catch( (err: any): Response => res.status(400).json({ err }))
                }
            }else{
                return res.status(404).json({
                    message: 'No such Event'
                });
            }
        })
    },

    deleteEvent: (req: Request, res: Response, next: NextFunction) => {
        
        event.findByPk(req.params.id)
        .then( (_event: Event): void | Response => {
            
            if(_event){
                const filename = _event.imageUrl.split('/uploads/')[1];
                const imagePath = `${__dirname.split('/src')[0]}/public/uploads/${filename}`;
                
                fs.unlink(imagePath, () => {
                    
                    event.destroy({
                        where: {
                            id: req.params.id
                        }
                    })
                    .then( (event: Event) => {
                        console.log(event);
                        return res.status(200).json({
                            message: 'The ressource was deleted successfully',
                        })
                    })
                    .catch( (err: any): Response => res.status(400).json({ err }))
                });
            }else{
                
                return res.status(400).json({
                    message: 'No such event'
                });
            }

        })
        .catch( (err: any): Response => res.status(400).json(err));
    }
}