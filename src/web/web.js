import chalk from 'chalk';

const isProd = process.argv.includes('-p');

import express from 'express';
import https from 'https';

import fs from 'fs';

// 中间件
import bodyParser from 'body-parser';
import morgan from 'morgan';

import routerSetup from './routerSetup.js';

export default () => {
    console.log(chalk.cyan('[i] 正在启动web服务器'));
    const app = express();
    const port = {
        ssl: 443,
        default: 80,
    };
    const key = fs.readFileSync('./src/web/static/www.jerrymc.cn.key');
    const cert = fs.readFileSync('./src/web/static/www.jerrymc.cn_bundle.pem');
    const options = {
        key,
        cert,
    };

    // 日志
    app.use(morgan(chalk.grey(`[Web] ${isProd ? '(:remote-addr) ':''}:method :url :status :res[content-length] - :response-time ms`)))

    // post解析
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    // 路由
    routerSetup(app);

    var server = https.createServer(options, app);
    server.listen(port.ssl, () => {
        console.log(
            chalk.bold.hex('#00FF00')(
                '[ok] JMC应用在端口' + (typeof server.address() == 'string' ?
                    server.address() :
                    server.address().port + '开启')
            )
        );
    });
    app.listen(port.default, () => {
        console.log(chalk.bold.hex('#00FF00')('[ok] JMC应用在端口' + port.default+'开启'));
    });
};