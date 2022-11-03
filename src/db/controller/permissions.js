import _knex from 'knex';
import dbConfig from '../../config/db.config.js';

export let findPermission = async (uid) => {
    var knex = _knex(dbConfig);
    var res = await knex.where({ uid }).from('permissions');
    console.log(res);

    return res;
};

export let addPermission = async (
    uid,
    permission,
    value = true,
    expire = 0
) => {
    var knex = _knex(dbConfig);

    var exists = false;
    (await findPermission(uid)).forEach((v) => {
        if (permission == v) exists = true;
    });
    if (exists) return;

    await knex.insert({ uid, permission, expire, value }).into('permissions');
};

export let changePermission = async (
    uid,
    permission,
    targetPermission,
    targetExpire,
    targetValue
) => {};
