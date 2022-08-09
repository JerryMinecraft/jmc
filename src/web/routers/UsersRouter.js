import express from 'express';
import jwt from 'json-web-token';

import genRes from '../help/genRes.js';
import md5 from '../help/md5.js';

import { addUser, findUser } from '../../db/controller/user.js';

const router = express.Router();
const _jwtSecret = 'jmcNb!!!!!!!';

router.post('/register', async(req, res) => {
    var body = req.body;
    // 验证请求体
    if (!body.name || !body.email || !body.password)
        return res.status(200).send(genRes('', false, '不完整的请求体'));

    var hasUser = (await findUser(body.name)).length > 0;
    if (hasUser) return res.status(200).send(genRes('', false, '用户已存在'));

    var userId = (await addUser(body.name, md5(body.password), body.email))[0];

    res.status(200).send(genRes({ id: userId }));
});

router.post('/login', async(req, res) => {
    var body = req.body;
    // 验证请求体
    if (!body.account || !body.password)
        return res.status(200).send(genRes('', false, '不完整的请求体'));

    var userRes = await findUser(body.account);
    if (userRes.length == 0) return res.status(200).send(genRes({ err: true, msg: '用户不存在', token: '' }));
    var userData = userRes[0];
    if (userData.password != md5(body.password)) return res.status(200).send(genRes({ err: true, msg: '密码错误', token: '' }))

    jwt.encode(_jwtSecret, { id: userData.id }, (err, token) => {
        if (err) {
            res.send(genRes({}, false, err));
            req.log.error(err);
        };
        res.send(genRes({ err: false, msg: '', token }));
    });
})

router.post('/online', async(req, res) => {
    var body = req.body;
    if (!body.token) return res.status(200).send(genRes('', false, '不完整的请求体'));

    jwt.decode(_jwtSecret, body.token, async(err, payload) => {
        if (err) {
            res.send(genRes({}, false, err));
            req.log.error(err);
        };

        var userRes = await findUser("", payload.id);
        if (userRes.length == 0) return res.status(200).send(genRes({ err: true, msg: '用户不存在', data: {} }));

        var userData = userRes[0];
        delete userData.password;
        res.send(genRes({ err: false, msg: "", data: userData }));
    })
})

export default router;