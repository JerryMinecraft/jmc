import genRes from '../help/genRes.js';
import { findPermission } from '../../db/controller/permissions.js';
import getUserData from '../help/getUserData.js';
import { hasPermission } from './PermissionController.js';

/**
 *  Permission Error Code
 *   0 需要token(未登陆)
 *   1 权限不足
 */

export let noTokenRes = {
    error: 'Login needed',
    isPermissionError: true,
    permissionErrorCode: 0,
};

export let genPermissionRes = (permissionId) => {
    return {
        error: 'Permission Denied',
        requriePermission: permissionId,
        isPermissionError: true,
        permissionErrorCode: 1,
    };
};

export function withPermission(permissionId) {
    return async(req, res, next) => {
        if (!req.body.token) {
            res.send(genRes(noTokenRes, false, 'permission'));
            next('route');
            return;
        }
        var p = await getUserData(req.body.token)
        if (!p || p.error) {
            res.send(genRes(noTokenRes, false, 'permission'));
            next('route');
            return;
        }
        var userData = p.userData;
        var canUse = await hasPermission(userData.id, permissionId);
        if (!canUse) {
            res.send(genPermissionRes(permissionId));
            next('route');
            return;
        }
        next();
    };
}