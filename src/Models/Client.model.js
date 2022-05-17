const db = require('../Services/database.service');
const { DataTypes } = require('sequelize');

const client = db.define('Client', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    codecli: {
        type: DataTypes.STRING(15),
        unique: true,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING(40),
        allowNull: false,
        validate: {
            len: [3, 40]
        }
    },
    FirstName: {
        type: DataTypes.STRING(40),
        allowNull: false,
        validate: {
            len: [3, 40]
        }
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                args: true,
                msg: 'This is an invalid email'
            }
        }
    },
    roles: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: ['ROLE_USER'],
        validate: {
            isIn: {
                args: [['ROLE_ADMIN', 'ROLE_USER']],
                msg: 'Undefined value'    
            }
        }
    },
    password: {
        type: DataTypes.STRING(180),
        allowNull: false,
        validate: {
            len: [6, 30]
        }
    },
    phone: {
        type: DataTypes.STRING(10),
        unique: true,
        allowNull: false,
        validate: {
            len: 10
        }
    },
    cardNumber: {
        type: DataTypes.STRING(16),
        unique: true,
        allowNull: false,
        validate: {
            isCreditCard: {
                args: true,
                msg: 'Invalid credit card'
            }
        }
    }
});

module.exports = client;