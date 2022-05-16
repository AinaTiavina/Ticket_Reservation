const Event = require('../Models/Event.model');

module.exports = {

    getAllEvents: (req, res, next) => {
        
        Event.findAll({
            attributes: { exclude: 'id' }
        })
        .then( events => res.status(200).json(events))
        .catch( err => res.status(400).json({ err }))
    },

    createEvent: (req, res, next) => {
        
        Event.create({
            numEvent: "E_"+req.body.dateEvent,
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
        
        Event.findAll({
            where: {
                id: req.params.id
            },
            attributes: { exclude: 'id' }
        })
        .then( event => res.status(200).json({ event }))
        .catch( err => res.status(400).json({ err }))
    },

    updateEvent: (req, res, next) => {
        
        const event = {
            numEvent: "E_"+req.body.dateEvent,
            title: req.body.title,
            category: req.body.category,
            categoryAge: req.body.categoryAge,
            cost: req.body.cost,
            dateEvent: new Date(req.body.dateEvent)    
        };

        Event.update(event, {
            where: {
                id: req.params.id
            }
        })
        .then( () => res.status(200).json({
            message: 'The ressource was updated successfully'
        }))
        .catch( err => res.status(400).json({ err }))
    }
}