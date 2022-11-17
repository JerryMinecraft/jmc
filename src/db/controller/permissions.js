import _knex from 'knex';
import dbConfig from '../../config/db.config.js';
import { getRandomHash } from '../../web/help/lib.js';

export let findPermission = async(uid) => {
    var knex = _knex(dbConfig);
    return await knex.where({ uid }).from('permissions');
};

export let matchHashPermission = async(phash) => {
    var knex = _knex(dbConfig);
    return await knex.where({ phash }).from('permissions');
};

export let addPermission = async(
    uid,
    permission,
    value = true,
    importance = 5,
    expire = 0,
    phash = getRandomHash()
) => {
    var knex = _knex(dbConfig);

    var exists = false;
    (await findPermission(uid)).forEach((v) => {
        if (permission == v) exists = true;
    });
    if (exists) return;

    return await knex
        .insert({ uid, permission, expire, value, importance, phash })
        .into('permissions');
};

export let matchPermission = async(
    uid,
    permission,
    value,
    importance,
    expire
) => {
    var knex = _knex(dbConfig);

    var finder = knex;
    if (uid) finder = finder.where({ uid });
    if (permission) finder = finder.where({ permission });
    if (value) finder = finder.where({ importance });
    if (expire) finder = finder.where({ expire });

    return await finder.from('permissions');
};

export let changePermission = async(
    uid,
    permission,
    targetPermission,
    targetExpire,
    targetValue,
    targetImportance
) => {};