const mailer = require('../Config/mailer.config');
const Twig = require('node-twig');

const message = async (req, event, reservation) => {
    Twig.renderFile(
        __dirname.split('src/')[0] + "public/Pages/ticket.twig", 
        { 
            context: {
                title: "test",
                event_title: event.title,
                day: event.dateEvent.split(' ')[0],
                date: `${event.dateEvent.split(' ')[1]} ${event.dateEvent.split(' ')[2]}`,
                year: `${event.dateEvent.split(' ')[3]}`,
                category: event.category,
                reservation_code: reservation.codeReservation
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