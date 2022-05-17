const { event } = require('../Models')

module.exports = {

    getAllEvents: (req, res, next) => {
        
        event.findAll({
            attributes: { exclude: 'id' }
        })
        .then( events => res.status(200).json(events))
        .catch( err => res.status(400).json({ err }))
    },

    createEvent: (req, res, next) => {
        
        event.create({
            numEvent: "E_"+req.body.dateEvent.split('-').join(''),
            title: req.body.title,
            category: req.body.category,
            categoryAge: req.body.categoryAge,
            cost: req.body.cost,
            dateEvent: new Date(req.body.dateEvent)
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
        
        const event = {
            numEvent: "E_"+req.body.dateEvent.split('-').join(''),
            title: req.body.title,
            category: req.body.category,
            categoryAge: req.body.categoryAge,
            cost: req.body.cost,
            dateEvent: new Date(req.body.dateEvent)    
        };

        event.update(event, {
            where: {
                id: req.params.id
            }
        })
        .then( () => res.status(200).json({
            message: 'The ressource was updated successfully'
        }))
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