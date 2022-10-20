import express from 'express';
import jwt from 'json-web-token';
import validator from 'validator';

import genRes, { errRes } from '../help/genRes.js';
import getUserData from '../help/getUserData.js';
import md5 from '../help/md5.js';

import { addUser, findUser, setUser } from '../../db/controller/user.js';

const router = express.Router();
const _jwtSecret = 'jmcNb!!!!!!!';

/**
 * @api {post} /users/register 注册新用户
 * @apiName 注册
 * @apiGroup User
 * 
 * @apiBody {String} name 用户名
 * 
 * @apiSuccess {Number} id 用户id
 * @apiError BodyError 不完整的请求体
 * @apiError UserExists 用户已存在
 */
router.post('/register', async(req, res) => {
    var body = req.body;
    // 验证请求体
    if (!body.name || !body.email || !body.password)
        return res.status(200).send(genRes('', false, errRes.bodyError));

    var hasUser = (await findUser(body.name)).length > 0;
    if (hasUser) return res.status(200).send(genRes('', false, errRes.userExists));

    var userId = (await addUser(body.name, md5(body.password), body.email))[0];

    res.status(200).send(genRes({ id: userId }));
});

/**
 * @api {post} /users/login 用户登陆
 * @apiName 登陆
 * @apiGroup User
 * 
 * @apiBody {String} account 用户信息
 * @apiBody {String} password 密码
 * 
 * @apiSuccess {String} token 用户唯一标识
 * @apiError BodyError 不完整的请求体
 * @apiError UserNotExists 用户不存在
 * @apiError PasswordError 密码错误
 */
router.post('/login', async(req, res) => {
    var body = req.body;
    // 验证请求体
    if (!body.account || !body.password)
        return res.status(200).send(genRes('', false, errRes.bodyError));

    var userRes = await findUser(body.account);
    if (userRes.length == 0)
        return res
            .status(200)
            .send(genRes({ err: true, msg: errRes.userNotExists, token: '' }));
    var userData = userRes[0];
    if (userData.password != md5(body.password))
        return res
            .status(200)
            .send(genRes({ err: true, msg: errRes.passwordError, token: '' }));

    jwt.encode(_jwtSecret, { id: userData.id }, (err, token) => {
        if (err) {
            res.send(genRes({}, false, err));
            req.log.error(err);
        }
        res.send(genRes({ err: false, msg: '', token }));
    });
});

/**
 * @api {post} /users/online 获取用户信息
 * @apiName 用户信息获取
 * @apiGroup User
 * 
 * @apiBody {String} token 用户唯一标识
 * 
 * @apiSuccess {UserData} data 用户信息
 * @apiError BodyError 不完整的请求体
 * @apiError UserNotExists 用户不存在
 */
router.post('/online', async(req, res) => {
    var body = req.body;
    if (!body.token)
        return res.status(200).send(genRes('', false, errRes.bodyError));

    var p = await getUserData(body.token);
    if (p.error) return res.send(genRes({ err: true, msg: p.error, data: {} }));
    res.send(genRes({ err: false, msg: '', data: p.userData }));
});

/**
 * @api {post} /users/upload_avatar 上传头像
 * @apiName 头像上传
 * @apiGroup User
 * 
 * @apiIgnore 未完成
 */
router.post('/upload_avatar', async(req, res) => {
    var body = req.body;
    if (!body.token || !body.avatar)
        return res.status(200).send(genRes('', false, errRes.bodyError));

    var p = await getUserData(body.token);
    if (p.error) return res.send(genRes({ err: true, msg: p.error, data: {} }));
    var userData = p.userData;
    // 验证userData.avatar是否是dataUri
    if (!validator.isDataURI(body.avatar))
        return res.status(200).send(genRes('', false, '头像类型不符合'));

    userData.avatar = body.avatar;
    var id = await setUser(userData.id, userData);
    res.send(genRes({ id }));
});

/**
 * @api {post} /users/add_player 添加游戏内玩家
 * @apiName 玩家添加
 * @apiGroup 用户
 * 
 * @apiIgnore 未完成
 */
router.post('/add_player', async(req, res) => {
    var body = req.body;
})

export default router;