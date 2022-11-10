import _knex from 'knex';
import dbConfig from '../../config/db.config.js';
import md5 from '../../web/help/md5.js';

import chalk from 'chalk';
import { addPermission } from './permissions.js';
import PermissionList from '../../web/permissions/PermissionList.js';

async function createTable(
    knex = _knex(),
    isProd = false,
    table = '',
    notExists = async() => {}
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

export default async(isProd = false) => {
    console.log(chalk.cyan('[i]正在初始化数据库'));

    // 用户
    var knex = _knex(dbConfig);
    await createTable(knex, isProd, 'users', async() => {
        await knex.schema.createTable('users', (builder) => {
            builder.increments('id');
            builder.string('name');
            builder.string('password');
            builder.string('description').defaultTo('介绍自己就算啦～');
            builder.string('avatar');

            builder.string('qq');
            builder.string('email');
            builder.integer('gender').defaultTo(0);

            builder.integer('level').defaultTo(0);
            builder.integer('exp').defaultTo(0);
            builder.integer('gold').defaultTo(0);

            builder.integer('sponsershipAmount').defaultTo(0);

            builder.boolean('isAdmin').defaultTo(false);
            /**
             * Admin level
             * 0 普通用户
             * 1 白名单审核员
             * 2 管理员
             * 3 管理机器人专用
             * 4 服主
             *
             * -------已废弃--------
             */
            builder.integer('adminLevel').defaultTo(0);
        });
    });

    // 白名单
    await createTable(knex, isProd, 'whitelist', async() => {
        await knex.schema.createTable('whitelist', (builder) => {
            builder.increments('id');

            builder.integer('uid');
            builder.string('nickname');

            builder.string('does');
            /**
             * Status
             * 0 审核中
             * 1 通过
             * 2 驳回
             * 3 封禁
             */
            builder.integer('status').defaultTo(0);
        });
    });

    // 权限
    await createTable(knex, isProd, 'permissions', async() => {
        await knex.schema.createTable('permissions', (builder) => {
            builder.string('phash');

            builder.integer('uid');
            builder.string('permission');
            builder.boolean('value');
            builder.integer('importance');

            builder.timestamp('expire').defaultTo(0);
        });
    });

    knex.insert();

    var adminId = (
        await knex
        .insert({
                name: 'bcmray',
                email: 'bcmray@qq.com',
                password: md5('114514'),
                isAdmin: true,
                adminLevel: 4,
            },
            'id'
        )
        .into('users')
    )[0];

    addPermission(addPermission, PermissionList.admin._, true, 10);
    addPermission(addPermission, PermissionList.user._, true, 10);

    console.log('创建默认管理员用户 id:', adminId);
};