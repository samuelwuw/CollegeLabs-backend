const connection = require('../database/connection');

module.exports = {
  async index(request, response){
    const { id } = request.body;

    console.log('chegou');
    const follows = await connection('follows')
      .where('follows', id)
      .select('*');

      return response.json(follows);
  },

  async create(request, response){
    const {follows, follows_type, followed, followed_type}  = request.body;

    const[id] = await connection('follows').insert({
      follows, follows_type, 
      followed, followed_type
    });

    return response.json({id});    
  },

  async delete(request, response){
    const { id } = request.params;

    await connection('follows').where('follows', id).delete();
    return response.status(204).send();
  }
}