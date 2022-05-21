const { event } = require('../Models')

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

        event.update(newEvent, {
            where: {
                id: req.params.id
            }
        })
        .then( find => {

            if(!find[0]){
                return res.status(404).json({
                    message: 'Ressource not found.'
                });
            }

            return res.status(200).json({
                message: 'The ressource was updated successfully'
            })
        })
        .catch( err => res.status(400).json({ err }))
    },

    deleteEvent: (req, res, next) => {

        event.destroy({
            where: {
                id: req.params.id
            }
        })
        .then( () => res.status(200).json({
            message: 'The ressource was deleted successfully',
        }))
        .catch( err => res.status(400).json({ err }))
    }
}