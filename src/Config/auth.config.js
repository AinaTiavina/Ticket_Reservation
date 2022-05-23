module.exports = {
    secret: 'poseidon-web-token',
    data: (client) => {
        return {
            id: client.id,
            email: client.email,
            roles: client.roles
        }
    }
}