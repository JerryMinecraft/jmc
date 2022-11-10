import {
    matchHashPermission,
    matchPermission,
} from '../../db/controller/permissions.js';
import { getCurrentTimestamp } from '../help/lib.js';

export let checkPermissionExpired = async (permission) => {
    if (!permission) return true;
    return permission.expire != 0 && permission.expire <= getCurrentTimestamp();
};

export let hasPermission = async (uid, targetPermission) => {
    var splitedTargetPermission = targetPermission.split('.');

    var currentValue = false;
    var currentImportance = 0;

    for (let i = 0; i < splitedTargetPermission.length; i++) {
        var checkPermission = splitedTargetPermission
            .slice(0, splitedTargetPermission.length - i)
            .join('.');
        // 获取所有关于此权限的父权限与本身的权限信息
        var permission = await matchPermission(uid, checkPermission);
        for (let index = 0; index < permission.length; index++) {
            const _perm = permission[index];
            // 检查是否过期, 若重复按权重设置
            if (!(await checkPermissionExpired(_perm))) {
                if (_perm.importance > currentImportance) {
                    currentImportance = _perm.importance;
                    currentValue = _perm.value;
                }
            }
        }
    }
    // 返回
    return currentValue;
};
