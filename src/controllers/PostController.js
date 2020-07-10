const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        //esquema de paginação e contagem de incidentes
        const { page = 1} = request.query;

        const [ count ] = await connection('posts').count();
        
        const posts = await connection('posts')
            .join('researchers', 'researchers.id', '=', 'posts.researcher_id') 
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'posts.*',
                'researchers.name',
                'researchers.email',
                'researchers.city',
                'researchers.uf'
            ]);

        response.header('X-Total-Count', count['count(*)']);

        return response.json(posts);
    },

    async create(request, response){
        const { title, description } = request.body;
        const researcher_id = request.headers.authorization;

        const [id] = await connection('posts').insert({
            title, 
            description,
            researcher_id,
        });

        return response.json({ id });
    },  

    async update(request, response){
        const { id } = request.params;
        const researcher_id = request.headers.authorization;
        const { title, description } = request.body;

        const post = await connection('posts')
        .where('id', id)
        .select('researcher_id')
        .first();

        if(post.researcher_id != researcher_id){
            return response.status(401).json({ error: 'Operation not permitted'});
        }

        await connection('posts').where('id', id).update({
            title,
            description
        });
        return response.status(204).send();
    },

    async updateLikes(request, response){
        const { id } = request.params;
        
        const like = await connection('posts')
        .where('id', id)
        .select('likes')
        .first();

        const likes = like.likes + 1;

        await connection('posts').where('id', id).update({
            likes
        });
        return response.status(204).send();
    },

    async delete(request, response){
        const { id } = request.params;
        const researcher_id = request.headers.authorization;

        const post = await connection('posts')
            .where('id', id)
            .select('researcher_id')
            .first();

        if(post.researcher_id != researcher_id){
            return response.status(401).json({ error: 'Operation not permitted.'});
        }

        await connection('posts').where('id', id).delete();
        return response.status(204).send();
    }
};