const generateUniqueId = require('../utils/generateUniqueId');
const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const citizen = await connection('citizens').select('*');
    
        return response.json(citizen);
    },

    async create(request, response) {
        const { name, identity, password, email, birthdate, graduation } = request.body;

        const id = "0" + generateUniqueId();

        await connection('citizens').insert({
            name, 
            identity, 
            email,
            password, 
            birthdate, 
            graduation,
            id
        })

        return response.json({ id });
    },

    async update(request, response){
        const { id } = request.params;
        const  { name, password, email, identity, birthdate, graduation} = request.body;

        await connection('citizens').where('id', id).update({
            name, 
            password, 
            email,
            password, 
            birthdate, 
            graduation,
            id
        });

        return response.status(204).send();
    }
};