require('dotenv').config();
const mailer = require('nodemailer');

const mailerConfig = {
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "73ea86e1dd630a",
        pass: "79b9675c4992a1"
  }
};

module.exports = mailer.createTransport(mailerConfig);