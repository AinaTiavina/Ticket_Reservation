const Event = require('../Models/Event.model');

const add = () => {
    const event = Event.build({
        numEvent: 'E_11022022',
        title: 'event1',
        category: 'drame',
        categoryAge: 'Enfant',
        cost: 100,
        dateEvent: new Date('11-02-2022')
    });

    event.save()
        .then(() => {
            console.log('added successfully')
        })
        .catch(err => {
            console.log(err);
        })
    ;
}

module.exports = add;