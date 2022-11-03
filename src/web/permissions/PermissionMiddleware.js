import genRes from '../help/genRes';
import { findPermission } from '../../db/controller/permissions';
import getUserData from '../help/getUserData';

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
    return async (req, res, next) => {
        if (!req.body.token) {
            res.send(genRes(noTokenRes, false, 'permission'));
            next('route');
        }
        var userPermissions = await permissionDb.findPermission(
            (
                await getUserData(req.body.token)
            ).id
        );
    };
}
