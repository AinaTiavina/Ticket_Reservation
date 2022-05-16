const Event = require('../Models/Event.model');

module.exports = {

    getAllEvents: (req, res, next) => {
        Event.findAll({
            attributes: { exclude: ['id'] }
        })
        .then( events => res.status(200).json({ events }))
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
        .then( event => {
            return res.status(201).json({event})   
        })
        .catch(err => {
            return res.status(400).json({err});
        })
    },


}