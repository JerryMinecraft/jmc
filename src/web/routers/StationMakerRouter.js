import express from 'express';

import fs from 'fs';
import path from 'path';
import svg2png from 'svg2png';

import genRes from '../help/genRes.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('ok');
})

router.post('/t', (req, res) => {
    if (!req.body.current_line || !req.body.current_station || !req.body.next_station) return res.send(genRes({}, false, '不完整的参数'));
    var name = `t_line${req.body.current_line}_station${req.body.current_station}_ns${req.body.next_station}.png`;
    var file = fs.readFileSync(path.join('src/web/static/station/jmc_transferable_station_sign.svg')).toString();
    file = file.replace(/{{\w+}}/g, (pair) => {
        var key = pair.replace('{{', '').replace('}}', '');
        return req.body[key];
    });
    fs.writeFileSync(path.join('src/web/static/station/imgs/', name), svg2png.sync(Buffer.from(file, 'utf-8'), { height: 256, width: 256 * 5 }));
    res.send(genRes({ path: "/sm/static/" + name }));
});

router.use('/static', express.static(path.join('src/web/static/station/imgs/')));

export default router;