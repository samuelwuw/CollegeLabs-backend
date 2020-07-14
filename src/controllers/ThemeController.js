const connection = require('../database/connection');
const { index } = require('./ResearcherController');

module.exports = {
  async index(request, response){
    const { id } = request.body;
    
    const themes = await connection('researchers')
      .where('id', id)
      .select('theme1');

    return response.json(themes);
  },
  
  async update(request, response){
    const { id } = request.params;
    const  { theme1, theme2, theme3 } = request.body;

    await connection('researchers').where('id', id).update({
        theme1, theme2, theme3
    });

    return response.status(204).send();
  }
};