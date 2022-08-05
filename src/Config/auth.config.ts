import { Client } from "../Types"

module.exports = {
    secret: 'poseidon-web-token',
    data: (client: Client): {
        id: number,
        email: string,
        roles: Array<string>
    } => ({
        id: client.id,
        email: client.email,
        roles: client.roles
    })
}