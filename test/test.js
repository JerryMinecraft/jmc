import initDb from '../src/db/controller/init.js';
import { addUser, findUser } from '../src/db/controller/user.js';

import path from 'path';

describe('数据库测试', () => {
    var userId = 0;
    it('初始化数据库', async () => {
        console.log(
            '测试数据库路径:',
            path.resolve('.', 'db', 'developingDb.sqlite')
        );
        await initDb();
    });
    it('添加用户', async () => {
        var addRes = (await addUser('bcmray', '114514', 'bcmray@qq.com'))[0];
        console.log('id', addRes);
        userId = addRes;
    });
    it('查找用户', async () => {
        console.log('查找id', userId);

        var findRes = await findUser(undefined, userId, undefined);
        console.log(findRes);
    });
});
