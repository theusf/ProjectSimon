knex = require('../database/connections');
const moment = require('moment');
const { param } = require('../routes');
moment.locale('br');

module.exports = {
    async index(request, response) {

        try {
            const patronize = await knex('patronize').select('*');

            return response.json(patronize);
        }
        catch (err) {
            console.log(err);
            return response.json(500).json({ message: "Server error has occured", err })
        }
    },

    async show(request, response) {

        try {
            const { id } = request.params

            const patronize = await knex('patronize').select('*').where('id', id).first();

            if (!patronize)
                return response.status(400).json({ message: 'Not found' })

            return response.json(patronize)

        }
        catch (err) {
            console.log(err);
            return response.json(500).json({ message: "Server error has occured", err })
        }
    },

    async getFromUser(request, response) {

        try {
            const { id_user } = request.params

            const patronize = await knex('patronize').select('*').where('id_user', id_user)

            if (!patronize[0])
                return response.status(400).json({ message: 'Not found for this user ' })

            return response.json(patronize)
        }
        catch (err) {
            console.log(err);
            return response.json(500).json({ message: "Server error has occured", err })
        }
    },

    async create(request, response) {
        try {
            const params = {
                id_user,
                id_user_bank_data,
                id_ong,
                id_ong_bank_data,
                id_animal,
                value,
                monthly
            } = request.body;

            params.creation_date = moment().format().toString();
            param.status = 'A';

            const ret = await knex('patronize')
                .returning('*')
                .insert(params);

            return response.json(ret);
        }
        catch (err) {
            console.log(err);
            return response.json(500).json({ message: "Server error has occured", err })

        }
    },
    async deactivate(request, response) {

        try {
            const { id } = request.params

            const ret = await knex('patronize')
            .update('status', 'D')
            .returning('*')
            .where('id', id)

            const patronize = ret[0]

            if (!patronize)
                return response.status(400).json({ message: 'Patronize not found' })
            
            return response.json({message: "Patronize deactivated with success!", patronize});
        }
        catch (err) {
            console.log(err);
            return response.json(500).json({ message: "Server error has occured", err })

        }

    }
}