const { client } = require('../Models');

module.exports = {

    isUserExist: (req, res, next) => {
        client.findOne({
            where: {
                email: req.body.email
            }
        })
        .then( event => {
            if(!event){
                return res.status(404).json({
                    message: 'User not found!'
                });
            }
            next();
        })
    },
}