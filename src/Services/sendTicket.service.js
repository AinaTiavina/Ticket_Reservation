const mailer = require('../Config/mailer.config');
const Twig = require('node-twig');

const message = async (req, event, reservation) => {
    Twig.renderFile(
        __dirname.split('src/')[0] + "public/Pages/ticket.twig", 
        { 
            context: {
                title: "test"
            }
        }, 
        (err, html) => {
            mailer.sendMail({
                to: req.clientEmail,
                from: 'noreply@gmail.com',
                subject: "Ticket ordering",
                html: html
            });
    })
}

module.exports = message;