import express from 'express';

import genRes, { errRes } from '../help/genRes.js';
import getUserData from '../help/getUserData.js';

import {
    addRequest,
    changeWhitelistStatus,
    findWhitelist,
} from '../../db/controller/whitelist.js';

const router = express.Router();

/**
 * @api {post} /whitelist/request 发送白名单申请
 * @apiName 申请
 * @apiGroup Whitelist
 * 
 * @apiBody {String} nickname 游戏名
 * @apiBody {String} does 所做
 * @apiBody {String} token 用户唯一标识
 * 
 * @apiSuccess {Number} requstId 请求id
 * @apiError BodyError 不完整的请求体
 * @apiError UserNotExists 用户不存在
 * 
 * @apiVersion 1.2.6
 */
router.post('/request', async(req, res) => {
    var body = req.body;
    if (!body.nickname || !body.does || !body.token)
        return res.send(genRes({}, false, errRes.bodyError));

    var { error, userData } = await getUserData(body.token);
    if (error) return res.send(genRes({ err: true, msg: error, data: {} }));

    var requestId = await addRequest(userData.id, body.nickname, body.does);
    res.send(genRes({ requestId }));
});

/**
 * @api {post} /whitelist/list 获取白名单请求列表
 * @apiName 请求列表获取
 * @apiGroup Whitelist
 * 
 * @apiBody {String} token 用户唯一标识
 * @apiBody {String} [nickname] 玩家名
 * @apiBody {Number} [status] 审核状态
 * @apiBody {Number} [uid] 用户id
 * 
 * @apiSuccess {Number} requstId 请求id
 * @apiError BodyError 不完整的请求体
 * @apiError UserNotExists 用户不存
 */
router.post('/list', async(req, res) => {
    // 获取白名单请求列表
    var body = req.body;
    if (!body.token) return res.send(genRes({}, false, errRes.bodyError));

    var { error, userData } = await getUserData(body.token);
    if (error) return res.send(genRes({ err: true, msg: error, data: {} }));

    var { nickname, status, uid } = req.body;
    var list = await findWhitelist(nickname, uid, status);
    res.send({ list });
});

/**
 * @api {post} /whitelist/change 修改白名单审核状态
 * @apiName 审核状态修改
 * @apiGroup Whitelist
 * 
 * @apiBody {String} token 用户唯一标识
 * @apiBody {Number} id 用户id
 * @apiBody {Number} status 审核状态
 * 
 * @apiSuccess {Number} requstId 请求id
 * @apiError BodyError 不完整的请求体
 * @apiError UserNotExists 用户不存在
 * @apiError PermissionDenied 权限不足
 */
router.post('/change', async(req, res) => {
    // 更改白名单,adminLevel大于0可使用
    var body = req.body;
    if (!body.token || body.id == undefined || !body.status == undefined)
        return res.send(genRes({}, false, errRes.bodyError));

    var { error, userData } = await getUserData(body.token);
    if (error) return res.send(genRes({ err: true, msg: error, data: {} }));

    if (userData.adminLevel <= 0)
        return res.send(genRes({ err: true, msg: errRes.permissionDenied }));

    var id = await changeWhitelistStatus(body.id, body.status);
    res.send(genRes({ id }));
});

export default router;