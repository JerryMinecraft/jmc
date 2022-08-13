import _knex from 'knex';
import dbConfig from '../../config/db.config.js';

export let addRequest = async (uid, nickname, does) => {
    var knex = _knex(dbConfig);
    var res = await knex
        .insert({ uid, nickname, does }, 'id')
        .into('whitelist');
    return res;
};
export let changeWhitelistStatus = async (id, status) => {
    var knex = _knex(dbConfig);
    var res = await knex.where({ id }).from('whitelist').update({ status });
    return res;
};
export let findWhitelist = async (nickname, uid, status, id) => {
    if (!nickname) nickname = '';
    if (!uid) uid = 0;
    if (!status) status = 0;
    if (!id) id = 0;

    var knex = _knex(dbConfig);
    var res = await knex
        .where({ nickname })
        .orWhere({ uid })
        .orWhere({ status })
        .orWhere({ id })
        .from('whitelist');
    return res;
};
