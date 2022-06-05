export interface Reservation {
    id: number,
    codeReservation: string,
    placeNumber: string,
    payed: boolean,
    ClientId: number,
    EventId: number
    reservationDate: string
}

export interface Client {
    id: number,
    codecli: string,
    lastName: string,
    firstName: string,
    email: string,
    roles: string | string[],
    password: string,
    phone: string,
    cardNumber: string
}

export interface Event {
    id: number,
    numEvent: string,
    title: string,
    category: string,
    categoryAge: string,
    cost: number,
    dateEvent: string,
    imageUrl: string
}