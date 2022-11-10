import express from 'express';

import { findWhitelist } from '../../db/controller/whitelist.js';
import PermissionList from '../permissions/PermissionList.js';
import { withPermission } from '../permissions/PermissionMiddleware.js';

const router = express.Router();

/**
 *  Mc服务器路由非常特殊
 * 由于ray不太会java,不敢响应json,用简单的yesno就可以
 */

/**
 * @api {get} /mcserver/whitelist/:nickname 获取玩家是否在白名单内
 * @apiName 是否在白名单内信息获取
 * @apiGroup Minecraft
 * @apiPermission user.whitelist.get
 *
 * @apiParam {String} nickname 玩家游戏名
 *
 * @apiSuccess {String} back yes或no
 *
 * @apiVersion 1.2.8
 */
router.get(
    '/whitelist/:nickname',
    withPermission(PermissionList.user.whitelist.get),
    async(req, res) => {
        if (!req.params.nickname) return res.send('no');
        var list = await findWhitelist(req.params.nickname);
        var back = 'no';
        list.forEach((u) => {
            if (u.status == 1) back = 'yes';
        });
        res.send(back);
    }
);

export default router;