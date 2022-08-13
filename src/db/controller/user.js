import _knex from 'knex';
import dbConfig from '../../config/db.config.js';

export let findUser = async (name, id, email) => {
    var knex = _knex(dbConfig);
    var finder = knex;

    if (name) finder = finder.where({ name });
    if (id) finder = finder.where({ id });
    if (email) finder = finder.where({ email });

    var res = await finder.from('users');

    return res;
};
export let addUser = async (name, password, email = '') => {
    var knex = _knex(dbConfig);
    var res = await knex.insert({ name, password, email }, 'id').into('users');
    return res;
};
