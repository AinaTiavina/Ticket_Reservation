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
    }
}