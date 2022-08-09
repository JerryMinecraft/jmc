import _knex from 'knex';
import dbConfig from '../../config/db.config.js';

export let findUser = async (name, id, email) => {
    if (!name) name = '';
    if (!id) id = -1;
    if (!email) email = '';

    var knex = _knex(dbConfig);
    var res = await knex
        .where({ name })
        .orWhere({ id })
        .orWhere({ email })
        .from('users');

    return res;
};
export let addUser = async (name, password, email = '') => {
    var knex = _knex(dbConfig);
    var res = await knex.insert({ name, password, email }, 'id').into('users');
    return res;
};
