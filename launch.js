import chalk from 'chalk';
import init from './src/db/controller/init.js';
import launch from './src/index.js';

console.log(chalk.cyan('[*] 启动中……'));

function main() {
    var args = process.argv;

    console.log(chalk.bold.hex('#FF00FF')('[Tip] 目前环境:', args.includes('-p') ? '生产' : args.includes('--init-db') ? '初始化数据库' : '测试'));

    if (args.includes('--init-db')) {
        // 初始化数据库
        init(args.includes('-p'))
        return
    } else if (args.includes('-p')) {
        // 启动服务端
        launch();
        return;
    } else {
        // 测试环境
        init(args.includes('-p'))
        launch();
        return;
    }
}

main();