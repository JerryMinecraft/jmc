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
    var knex = _knex(dbConfig);
    var finder = knex;

    if (nickname) finder = finder.where({ nickname });
    if (uid) finder = finder.where({ uid });
    if (status) finder.where({ status });
    if (id) finder.where({ id });

    var res = await finder.from('whitelist');
    return res;
};
