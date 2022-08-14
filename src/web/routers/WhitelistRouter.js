import express from 'express';

import genRes from '../help/genRes.js';
import getUserData from '../help/getUserData.js';

import {
    addRequest,
    changeWhitelistStatus,
    findWhitelist,
} from '../../db/controller/whitelist.js';

const router = express.Router();

router.post('/request', async (req, res) => {
    var body = req.body;
    if (!body.nickname || !body.does || !body.token)
        return res.send(genRes({}, false, '不完整的请求体'));

    var { error, userData } = await getUserData(body.token);
    if (error) return res.send(genRes({ err: true, msg: error, data: {} }));

    var requestId = await addRequest(userData.id, body.nickname, body.does);
    res.send(genRes({ requestId }));
});

router.post('/list', async (req, res) => {
    // TODO: 获取白名单请求列表,adminLevel大于0可查看
    var body = req.body;
    if (!body.token) return res.send(genRes({}, false, '不完整的请求体'));

    var { error, userData } = await getUserData(body.token);
    if (error) return res.send(genRes({ err: true, msg: error, data: {} }));

    if (userData.adminLevel <= 0)
        return res.send(genRes({ err: true, msg: '权限不足' }));

    var { nickname, status, uid } = req.body;
    var list = await findWhitelist(nickname, uid, status);
    res.send({ list });
});

router.post('/change', async (req, res) => {
    // TODO: 更改白名单
    var body = req.body;
    if (!body.token || body.id == undefined || !body.status == undefined)
        return res.send(genRes({}, false, '不完整的请求体'));

    var { error, userData } = await getUserData(body.token);
    if (error) return res.send(genRes({ err: true, msg: error, data: {} }));

    if (userData.adminLevel <= 0)
        return res.send(genRes({ err: true, msg: '权限不足' }));

    var id = await changeWhitelistStatus(body.id, body.status);
    res.send(genRes({ id }));
});

export default router;
