import express from 'express';

import genRes from '../help/genRes.js';
import getUserData from '../help/getUserData.js';

import { addRequest } from '../../db/controller/whitelist.js';

const router = express.Router();

router.post('/request', async(req, res) => {
    var body = req.body;
    if (!body.nickname || !body.does || !body.token)
        return res.send(genRes({}, false, '不完整的请求体'));

    var { error, userData } = await getUserData(body.token);
    if (error) return res.send(genRes({ err: true, msg: error, data: {} }));

    var requestId = await addRequest(userData.id, body.nickname, body.does)
    res.send(genRes({ requestId }));
});

router.post('/get', async(req, res) => {
    // TODO: 获取白名单请求列表,adminLevel大于0可查看
    var body = req.body;
    if (!body.token)
        return res.send(genRes({}, false, '不完整的请求体'));

})

export default router;