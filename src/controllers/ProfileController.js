const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const researcher_id = request.headers.authorization;

        const posts = await connection('posts')
            .where('researcher_id', researcher_id)
            .select('*');

        return response.json(posts);
    }
}