require('dotenv').config();
const mailer = require('nodemailer');

const mailerConfig = {
    host:  "gmail",
    auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD
    } 
};

module.exports = mailer.createTransport(mailerConfig);