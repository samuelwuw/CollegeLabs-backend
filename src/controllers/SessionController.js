const connection = require('../database/connection');

module.exports = {
        async create(request, response){
            const { email, password } = request.body;

            const researcher = await connection('researchers')
                .where('email', email)
                .andWhere('password', password)
                .select('name', 'id', 'uf')
                .first();
            
            if(researcher){
                return response.json(researcher);
            }else{
                const citizen = await connection('citizens')
                .where('email', email)
                .andWhere('password', password)
                .select('name', 'id')
                .first();  
                
                
                if(!citizen){
                    return response.status(400).json({ error: "No citizen found with this email."});
                }else{ return response.json(citizen); }    
            }

        }
}