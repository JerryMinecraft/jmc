import express from 'express';

import { findWhitelist } from '../../db/controller/whitelist.js';

const router = express.Router();

/**
 *  Mc服务器路由非常特殊
 * 由于ray不太会java,不敢响应json,用简单的yesno就可以
 */

router.get('/whitelist/:nickname', async (req, res) => {
    if (!req.params.nickname) return res.send('no');
    var list = await findWhitelist(req.params.nickname);
    var back = 'no';
    list.forEach((u) => {
        if (u.status == 1) back = 'yes';
    });
    res.send(back);
});

export default router;
