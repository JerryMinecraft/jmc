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

router.get('/rawlist', (req, res) => {
    res.send(genRes(PermissionList));
});

router.get('/list', (req, res) => {
    res.send(genRes(getAllObjectStringValue(PermissionList)));
});

router.get(
    '/data/:action/:value',
    withPermission(PermissionList.admin.permissoins.get),
    async (req, res) => {
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
