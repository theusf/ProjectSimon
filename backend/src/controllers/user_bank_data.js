knex = require('../database/connections');

module.exports = {
    async index (request, response){
        const users_bank_data = await knex('user_bank_data').select('*');

        return response.json(users_bank_data);
    },

    async show (request, response){
        const { id_user } = request.params

        const user_bank_data = await knex('user_bank_data').select('*').where('id_user', id_user)

        if (!user_bank_data)
            return response.status(400).json({message: 'User bank data not found'})

        return response.json(user_bank_data)
    },


    async create (request, response){

        try{
            const params = {
                id,
                id_user,
                cardholder_name,
                card_number,
                expires_date,
                cvv,
                address_line_1,
                address_line_2,
                city,
                state,
                cep,
                country,
            } = request.body;
    
            const ret = await knex('user_bank_data')
            .returning(['id','id_user'])
            .insert(params);
            return response.json({ret});
        }
        catch(err)
        {
            console.log(err);
            return response.status(500).json({error_message: JSON.stringify(err)})
        }
        
    }
}