import { Sequelize } from "sequelize/types";

const db: Sequelize = require('../Services/database.service');
import { DataTypes } from 'sequelize';

export const client = db.define('Client', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    codeCli: {
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
    firstName: {
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
            isEmail: true
        }
    },
    roles: {
        type: DataTypes.ARRAY(DataTypes.STRING(10)),
        allowNull: false,
        defaultValue: ['USER'],
    },
    password: {
        type: DataTypes.STRING(180),
        allowNull: false,
        validate: {
            len: [6, 180]
        }
    },
    phone: {
        type: DataTypes.STRING(10),
        unique: true,
        allowNull: false,
        validate: {
            len: [10, 10]
        }
    },
    cardNumber: {
        type: DataTypes.STRING(16),
        unique: true,
        allowNull: false,
        validate: {
            len: [16, 16]
        }
    }
}, {
    timestamps: false
});