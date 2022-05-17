const client = require('../Models/Client.model');
const bcrypt = require('bcrypt');

module.exports = {

    register: (req, res, next) => {
        
        bcrypt.hash(req.body.password, 8)
        .then( hash => {
            client.create({
                codeCli: "C_"+req.body.phone,
                lastName: req.body.lastName,
                firstName: req.body.firstName,
                email: req.body.email,
                roles: req.body.roles,
                password: hash,
                phone: req.body.phone,
                cardNumber: req.body.cardNumber
            })
            .then( () => res.status(201).json({
                message: 'The client was registered successfully.'
            }))
            .catch( err => res.status(400).json({
                error: err
            }))
        })
        .catch( err => res.status(500).json({
            error: err.message
        }));
    }
}