<h1 align="center">Ticket Reservation</h1>

<h2>ABOUT</h2>
<p>
    This API has a goal to make easy the building of a platform that is used to book a place in an event (i.e Cinema, Concert and many others). As it is an <b>open source</b>project, you are free to contribute or change it to your need.
</p>

<h2>USAGE</h2>

### Routes

| Subjects | Paths          | Methods  | Description               | Access     |
|:--------:|:--------------:|:--------:|:-------------------------:|:----------:|
| *Event*    | `/api/events`    | **GET**      | Retrieve all events      |            |
|          | `/api/events`    | **POST**     | Record an event           | **ADMIN**      |
|          | `/api/events/🆔` | **GET**      | Get one event with the specified id |   | 
|          | `/api/events/🆔` | **PUT**      | Modify an event with the specified id | **ADMIN** |
|          | `/api/events/🆔` | **DELETE**   | Delete an event with the specified id | **ADMIN** |
| *Clients*  | `/api/clients`   | **GET**      | Retrieve all Clients      | **ADMIN** |
|          | `/api/events/🆔` | **GET**      | Get a client who matches the id | **ADMIN,OWNER** |
| *Authentication* | `/login` | **POST** | Authenticate the user in order to get the token | | 
|                | `/register` | **POST** | To subscribe as a member |   |
|  | `/refreshToken` | **POST** | To obtain a new token without log in | **USER** |
| *Reservation* | `/api/reservations?isPayed=true/false(optional)` | **GET** | Fetch all reservations | **ADMIN;OWNER** |
| | `/api/reservations?event=🆔` | **POST** | Save a reservation which relates to the specified event | **USER** |
| | `/api/reservations/🆔/payment` | **POST** | Pay the reservation | **OWNER** | 

### NB: The blank value inside the Access column means that everyone can access the ressources.

### Data Format
    Generally, we use JSON as a response from the server thus all responses are very easy to handle with JS as it is common a JavaScript Object. Whereas, a different data format occurs while we send a request to the server. It depends on the operation that we want to process.
    The Event needs to upload an image file, as a consequence we need to handle it and store its path inside the database. In order to make it successful, we ought to use a different data format called multipart-form-data. It is a suitable format for uploading an image.

<h2>Client</h2>

### Registration

    {
        "lastName": "John",
        "firstName": "Doe",
        "email": "johnDoe@gmail.com",
        "password": "password",
        "phone": "0343434334",
        "cardNumber": "4242424142424242"
    }

### Login

    {
        "email": "johnDoe@gmail.com",
        "password": "password"
    }

### Refresh token

    {
	    "email": "johnDoe@gmail.com"
    }

<h2>Reservation</h2>

### Book

    {
	    "placeNumber": "5"
    }

### Payment

    {
        "number": 4242424242424242,         // client card Number
        "exp_month": 2,
        "exp_year": 2025,
        "cvc": 123,
        "address_state": "Madagascar",
        "address_zip": 101,
        "name": "John Doe"      // optional
    }

### NB: The event entity uses a multipart for data.

### If you have a glitch, contact me.
