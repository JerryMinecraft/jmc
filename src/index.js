import chalk from 'chalk';

import initdb from './db/controller/init.js';
import initWeb from './web/web.js';

export default () => {
    // 进程事件
    process.on('exit', (code) => {
        console.log(
            chalk.red('[!]服务器接收到exit事件,正在关闭服务器! 状态码:'),
            code
        );
    });
    process.on('uncaughtException', (err, origin) => {
        // 未被捕获的异常
        console.error(chalk.red('[x]出现未被捕获的异常'));
        console.error(err);
    });
    process.on('unhandledRejection', (err, promise) => {
        // 未被捕获的Promise回调
        console.error(chalk.red('[x]出现未被捕获的Promise回调'));
        console.error(err);
    });

    const isProd = process.argv.includes('-p');

    initdb(isProd);
    initWeb();
};