const client = require('../Models/Client.model');

module.exports = {

    retrieveAllClients: (req, res, next) => {
        client.findAll({
            attributes: {
                exclude: 'id'
            }
        })
        .then( clients => res.status(200).json(clients))
        .catch( err => res.status(400).json(err))
    },

    retrieveOneClient: (req, res, next) => {
        client.findByPk(req.params.id)
            .then( client => res.status(200).json(client) )
            .catch( err => res.status(400).json(err) )
    }
}