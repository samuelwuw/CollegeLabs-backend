const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const researcher_id = request.headers.authorization;

        const posts = await connection('posts')
            .where('researcher_id', researcher_id)
            .select('*');

        return response.json(posts);
    },

    async getResearcher(request, response){
        const researcher_id = request.headers.authorization;

        const researcherData = await connection('researchers')
            .where('id', researcher_id)
            .select('*');

        return response.json(researcherData);
    },

    async getPublication(request, response){
        const researcher_id = request.headers.authorization;

        const pubs = await connection('publications')
            .where('researcher_id', researcher_id)
            .select('*');

        return response.json(pubs);
    }
}