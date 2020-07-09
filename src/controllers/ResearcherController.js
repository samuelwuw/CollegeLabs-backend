const generateUniqueId = require('../utils/generateUniqueId');
const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const researcher = await connection('researchers').select('*');
    
        return response.json(researcher);
    },

    async create(request, response) {
        const { name, password, email, birthdate, workdate, city, uf, institution,
            graduationlvl, graduationinstitution, latteslink } = request.body;

        const id = "1" + generateUniqueId();

        await connection('researchers').insert({
            name, 
            password, 
            id,
            email, 
            birthdate, 
            workdate, 
            city, 
            uf, 
            institution,
            graduationlvl, 
            graduationinstitution, 
            latteslink
        })

        return response.json({ id });
    },

    async update(request, response){
        const { id } = request.params;
        const  { name, password, email, birthdate, workdate, city, uf, institution,
            graduationlvl, graduationinstitution, latteslink } = request.body;

        await connection('researchers').where('id', id).update({
            name, password, email, birthdate, workdate, city, uf, institution,
            graduationlvl, graduationinstitution, latteslink
        });

        return response.status(204).send();
    },
    async updateThemes(request, response){
        const { id } = request.params;
        const  { theme1, theme2, theme3 } = request.body;

        await connection('researchers').where('id', id).update({
            theme1, theme2, theme3
        });

        return response.status(204).send();
    }
};