import express from 'express';
import {
    matchHashPermission,
    matchPermission,
} from '../../../db/controller/permissions.js';
import genRes, { errRes } from '../../help/genRes.js';
import { getAllObjectStringValue } from '../../help/lib.js';
import PermissionList from '../../permissions/PermissionList.js';
import { withPermission } from '../../permissions/PermissionMiddleware.js';

const router = express.Router();

/**
 * @api {get} /admin/permissions/rawlist 获取原权限列表
 * @apiDescription 就是直接返回PermissionList.js的导出内容
 * @apiName 原权限列表获取
 * @apiGroup Admin
 *
 * @apiSuccess {Object} permissionList 未经处理的所有权限列表
 *
 * @apiVersion 1.2.8
 */
router.get('/rawlist', (req, res) => {
    res.send(genRes(PermissionList));
});

/**
 * @api {get} /admin/permissions/list 获取权限列表
 * @apiDescription 将权限列表进行搭配组合组成所有可用的权限列表
 * @apiName 权限列表获取
 * @apiGroup Admin
 *
 * @apiSuccess {Array} permissionList 所有权限列表(字符串)
 *
 * @apiVersion 1.2.8
 */
router.get('/list', (req, res) => {
    res.send(genRes(getAllObjectStringValue(PermissionList)));
});

/**
 * @api {get} /admin/permissions/data/:action/:value 获取权限数据
 * @apiName 权限数据获取
 * @apiGroup Admin
 * 
 * @apiParam {String} action 获取方式 (目前支持phash和uid两种方式)
 * @apiParam {String} value 获取的值
 *
 * @apiSuccess {Array} Permission 匹配的权限
 *
 * @apiVersion 1.2.8
 */
router.get(
    '/data/:action/:value',
    withPermission(PermissionList.admin.permissoins.get),
    async(req, res) => {
        switch (req.params.action) {
            case 'phash':
                var permissions = await matchHashPermission(req.params.value);
                res.send(genRes(permissions));
                break;

            case 'uid':
                var permissions = await matchPermission(req.params.value);
                res.send(genRes(permissions));
                break;

            default:
                res.send(genRes('', false, errRes.unknownAction));
                break;
        }
    }
);

export default router;