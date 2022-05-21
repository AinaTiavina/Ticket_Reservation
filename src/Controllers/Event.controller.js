const { event } = require('../Models')
const fs = require('fs');

module.exports = {

    getAllEvents: (req, res, next) => {
        
        event.findAll()
        .then( events => res.status(200).json(events))
        .catch( err => res.status(400).json({ err }))
    },

    createEvent: (req, res, next) => {
        
        event.create({
            ...req.body,
            imageUrl: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
        })
        .then( event => res.status(201).json(event))   
        .catch(err => res.status(400).json({err}))
    },

    getSingleEvent: (req, res, next) => {
        
        event.findByPk(req.params.id)
            .then( event => res.status(200).json({ event }))
            .catch( err => res.status(400).json({ err }))
        ;
    },

    updateEvent: (req, res, next) => {
        const newEvent = req.file ? {
            ...req.body,
            imageUrl: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`  
        } : {...req.body};

        event.findByPk(req.params.id)
        .then( _event => {
            if(_event){

                if(req.file){
                    const filename = _event.imageUrl.split('/uploads/')[1];
                    const imagePath = `${__dirname.split('/src')[0]}/public/uploads/${filename}`;
                    
                    fs.unlink(imagePath, () => {
                        event.update(newEvent, {
                            where: {
                                id: req.params.id
                            }
                        })
                        .then( () => {
                    
                            return res.status(200).json({
                                message: 'The ressource was updated successfully'
                            })
                        })
                        .catch( err => res.status(400).json({ err }))
                    });
                } else{
                    event.update(newEvent, {
                        where: {
                            id: req.params.id
                        }
                    })
                    .then( () => {
                
                        return res.status(200).json({
                            message: 'The ressource was updated successfully'
                        })
                    })
                    .catch( err => res.status(400).json({ err }))
                }
            }else{
                return res.status(404).json({
                    message: 'No such Event'
                });
            }
        })
    },

    deleteEvent: (req, res, next) => {
        
        event.findByPk(req.params.id)
        .then( _event => {
            
            if(_event){
                const filename = _event.imageUrl.split('/uploads/')[1];
                const imagePath = `${__dirname.split('/src')[0]}/public/uploads/${filename}`;
                
                fs.unlink(imagePath, () => {
                    
                    event.destroy({
                        where: {
                            id: req.params.id
                        }
                    })
                    .then( event => {
                        console.log(event);
                        return res.status(200).json({
                            message: 'The ressource was deleted successfully',
                        })
                    })
                    .catch( err => res.status(400).json({ err }))
                });
            }else{
                
                return res.status(400).json({
                    message: 'No such event'
                });
            }

        })
        .catch( err => res.status(400).json(err));
    }
}