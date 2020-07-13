const connection = require('../database/connection');
const path = require('path');
var fs = require('fs'); 

module.exports = {
    async index(request, response){
      // const directoryPath = path.join(__dirname, '..', '..', 'tmp', 'uploads');

      // fs.readdir(directoryPath, function (err, files) {
      //   if (err) {
      //       return console.log('Unable to scan directory: ' + err);
      //   } 
      //   files.forEach(function (file) {
      //     console.log(file); 
      //   });
      //   return response.json(files); 
      // });
      const { page = 1} = request.query;

      const [ count ] = await connection('publications').count();
      
      const pubs = await connection('publications')
          .join('researchers', 'researchers.id', '=', 'publications.researcher_id') 
          .limit(5)
          .offset((page - 1) * 5)
          .select([
              'publications.*'
          ]);

      response.header('X-Total-Count', count['count(*)']);
          console.log(pubs);
      return response.json(pubs);
    },

    async create(request,response){
      const { title, local, year, abstract, tags, url } = request.body;
      const researcher_id = request.headers.authorization;

      const [id] = await connection('publications').insert({
        title, local, year, abstract, tags, url, researcher_id
      });

      return response.json({ id });
    },

    async upload(request, response){
      console.log(request.file);
      return response.json(request.file);
    },
    

    async update(request, response){
      const { id } = request.params;
      const researcher_id = request.headers.authorization;
      const { title, local, year, abstract, tags, url, upload } = request.body;

      const pub = await connection('publications')
      .where('id', id)
      .select('researcher_id')
      .first();

      if(pub.researcher_id != researcher_id){
          return response.status(401).json({ error: 'Operation not permitted'});
      }

      await connection('publications').where('id', id).update({
        title, local, year, abstract, tags, url, upload
      });
      return response.status(204).send();
    },

    async updateLikes(request, response){
      const { id } = request.params;
      
      const like = await connection('publications')
      .where('id', id)
      .select('likes')
      .first();
      console.log(like);
      const likes = like.likes + 1;

      await connection('publications').where('id', id).update({
          likes
      });
      return response.status(204).send();
    },

    async updateUnlikes(request, response){
      const { id } = request.params;
      
      const like = await connection('publications')
      .where('id', id)
      .select('likes')
      .first();
      console.log(like);
      const likes = like.likes - 1;

      await connection('publications').where('id', id).update({
          likes
      });
      return response.status(204).send();
    },
    
    async updateFileName(request, response){
      const { id } = request.params;
      const { filename } = request.body;

      await connection('publications').where('id', id).update({
        filename
      });
      console.log(filename);
      return response.status(204).send();
    },

    async delete(request, response){
      const { id } = request.params;
      const researcher_id = request.headers.authorization;

      console.log(researcher_id);
      const pubs = await connection('publications')
          .where('id', id)
          .select('researcher_id')
          .first();
      
      if(pubs.researcher_id != researcher_id){
          return response.status(401).json({ error: 'Operation not permitted.'});
      }

      await connection('publications').where('id', id).delete();
      return response.status(204).send();
  }
};