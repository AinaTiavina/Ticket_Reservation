const { client } = require('../Models');

module.exports = {

    checkAllFields: (req, res, next) => {
        if(!req.body.email || !req.body.password) {
            return res.status(400).json({
                message: 'All fields should be filled.'
            });
        }
        
        next();
    },
    
    isUserExist: (req, res, next) => {
        client.findOne({
            where: {
                email: req.body.email
            }
        })
        .then( event => {
            if(!event){
                return res.status(404).json({
                    message: 'User not found. Check your email !!'
                });
            }
            next();
        })
    }
}