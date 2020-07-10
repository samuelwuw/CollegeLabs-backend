const connection = require('../database/connection');
const path = require('path');
var fs = require('fs'); 
const { update } = require('./PostController');

module.exports = {
    async index(request, response){
      const directoryPath = path.join(__dirname, '..', '..', 'tmp', 'uploads');

      fs.readdir(directoryPath, function (err, files) {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
        files.forEach(function (file) {
          console.log(file); 
        });
        return response.json(files); 
      });
    },

    async create(request, response){

      console.log(request.file);

      return response.json({ hello: "world"});
    },

    async update(request, response){
      const { id } = request.params;
      const directoryPath = path.join(__dirname, '..', '..', 'tmp', 'uploads');
      const researcher_pub = {};

      fs.readdir(directoryPath, function (err, files) {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
        files.forEach(function (file) {
          if(file.substring(0,8) === id){
            researcher_pub.prop = file;
          }
        });
      });
      return response.json(null); 
    }
};