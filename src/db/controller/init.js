import _knex from 'knex';
import dbConfig from '../../config/db.config.js';

import chalk from 'chalk';

async function createTable(
    knex = _knex(),
    isProd = false,
    table = '',
    notExists = async () => {}
) {
    var hasTable = knex.schema.hasTable(table);
    if (hasTable) {
        if (isProd)
            return console.log(
                chalk.blue('[i]数据库表格', table, '已存在,不会重新创建!')
            );
    }
    console.log(chalk.yellow('[i]正在创建/覆盖数据库表格', table));
    await knex.schema.dropTableIfExists(table);
    await notExists();
    console.log(chalk.green('[i]数据库表格', table, '创建/覆盖完成!'));
}

export default async (isProd = false) => {
    console.log(chalk.cyan('[i]正在初始化数据库'));

    var knex = _knex(dbConfig);
    await createTable(knex, isProd, 'users', async () => {
        await knex.schema.createTable('users', (builder) => {
            builder.increments('id');
            builder.string('name');
            builder.string('password');
            builder.string('description').defaultTo('介绍自己就算啦～');

            builder.string('qq');
            builder.string('email');
            builder.integer('gender').defaultTo(0);

            builder.integer('level').defaultTo(0);
            builder.integer('exp').defaultTo(0);
            builder.integer('gold').defaultTo(0);

            builder.boolean('inWhitelist').defaultTo(false);
            builder.integer('sponsershipAmount').defaultTo(0);

            builder.boolean('isAdmin').defaultTo(false);
            builder.integer('adminLevel').defaultTo(0);
        });
    });
};
