<h1 align="center">Ticket Reservation</h1>

<h2>ABOUT</h2>
<p>
    This API has a goal to make easy the building of a platform that is used to book a place in an event (i.e Cinema, Concert and many others). As it is an <b>open source</b>project, you are free to contribute or change it to your need.
</p>

<h2>USAGE</h2>

### Routes

<table>
    <tr>
        <th>Subjects</th>
        <th>Paths</th>
        <th>Methods</th>
        <th>Description</th>
        <th>Access</th>
    </tr>

    <tr>
        <td rowspan="5">Event</td>
        <td>/api/events</td>
        <td>GET</td>
        <td>Retrieve all events</td>
        <td></td>
    </tr>

    <tr>
        <td>/api/events</td>
        <td>POST</td>
        <td>Record an event</td>
        <td>ADMIN</td>
    </tr>

    <tr>
        <td>/api/events/:id</td>
        <td>GET</td>
        <td>Get one event with the specified id</td>
        <td></td>
    </tr>

    <tr>
        <td>/api/events/:id</td>
        <td>PUT</td>
        <td>Modify an event with the specified id</td>
        <td>ADMIN</td>    
    </tr>

    <tr>
        <td>/api/events/:id</td>
        <td>DELETE</td>
        <td>Delete an event with the specified id</td>
        <td>ADMIN</td>    
    </tr>

    <tr>
        <td rowspan="2">Clients</td>
        <td>/api/clients</td>
        <td>GET</td>
        <td>Retrieve all Clients</td>
        <td>ADMIN</td>
    </tr>

    <tr>
        <td>/api/clients/:id</td>
        <td>GET</td>
        <td>Get a client who matches the id</td>
        <td>ADMIN;OWNER</td>
    </tr>

    <tr>
        <td rowspan="2">Authentication</td>
        <td>/login</td>
        <td>POST</td>
        <td>Authenticate the user in order to get the token</td>
        <td></td>
    </tr>

    <tr>
        <td>/register</td>
        <td>POST</td>
        <td>To subscribe as a member</td>
        <td></td>
    </tr>

    <tr>
        <td rowspan="2">Reservation</td>
        <td>/api/reservations</td>
        <td>GET</td>
        <td>Fetch all reservations.</td>
        <td>ADMIN,OWNER</td>
    </tr>

    <tr>
        <td>/api/reservations?event=:id</td>
        <td>POST</td>
        <td>Save a reservation which relates to the specified event</td>
        <td>USER</td>
    </tr>
</table>

### NB: The blank value inside the Access column means that everyone can access the ressources.

### Data Format
    Generally, we use JSON as a response from the server thus all responses are very easy to handle with JS as it is common a JavaScript Object. Whereas, a different data format occurs while we send a request to the server. It depends on the operation that we want to process.
    The Event needs to upload an image file, as a consequence we need to handle it and store its path inside the database. In order to make it successful, we ought to use a different data format called multipart-form-data. It is a suitable format for uploading an image.

<table>
    <tr>
        <th>Subjects</th>
        <th>Methods</th>
        <th>Data Format</th>
    </tr>

    <tr>
        <td>Client, Reservation</td>
        <td>POST</td>
        <td>JSON</td>
    </tr>

    <tr>
        <td>Event</td>
        <td>POST/PUT(Creation/Modification)</td>
        <td>Multipart-form-data</td>
    </tr>
</table>