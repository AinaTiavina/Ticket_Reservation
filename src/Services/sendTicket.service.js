const mailer = require('../Config/mailer.config');

const message = async (req, event, reservation) => {
    await mailer.sendMail({
        to: req.clientEmail,
        from: 'noreply@gmail.com',
        subject: "Ticket ordering",
        text: "My first Email"
    });
}

module.exports = message;