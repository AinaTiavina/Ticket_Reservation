const { client } = require('../Models');
const { Op } = require('sequelize');

module.exports = {

    checkUserDuplication: (req, res, next) => {
        client.findOne({
            where: {
                [Op.or]: [
                    {email: req.body.email},
                    {phone: req.body.phone},
                    {cardNumber: req.body.cardNumber}
                ]
            }
        })
        .then( client => {
            if(client){
                return res.status(400).json({
                    message: 'User already exists.'
                })
            }

            next();
        })
    },

    checkUserRoles: (req, res, next) => {
        if(req.body.roles){
            const roles = req.body.roles.split(';');
        
            roles.forEach(element => {
                if(element !== 'USER' && element !== 'ADMIN'){
                    return res.status(400).json({
                        message: 'Roles should contains USER or/and ADMIN value'
                    })
                }
            });
        }
        next();
    }
}