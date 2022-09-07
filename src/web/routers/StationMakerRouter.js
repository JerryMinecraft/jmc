import express from 'express';

import fs from 'fs-extra';
import path from 'path';
import svg2png from 'svg2png';

import genRes from '../help/genRes.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('ok');
});

router.post('/t', (req, res) => {
    const {
        current_line,
        current_station,
        next_station,
        stroke_color,
        change_line,
        change_line_color,
    } = req.body;
    if (
        !current_line ||
        !current_station ||
        !next_station ||
        !stroke_color ||
        !change_line ||
        !change_line_color
    )
        return res.send(genRes({}, false, '不完整的参数'));

    var name = `t_line${current_line}_station${current_station}_ns${next_station}_next${next_station}_color${stroke_color.replace(
        '#',
        ''
    )}_cline${change_line}_ccolor${change_line_color.replace('#', '')}.png`;
    var p = path.join('src/web/static/station/imgs/', name);

    if (fs.existsSync(p))
        return res.send(genRes({ path: '/sm/static/' + name }));

    var file = fs
        .readFileSync(
            path.join(
                'src/web/static/station/jmc_transferable_station_sign.svg'
            )
        )
        .toString();
    file = file.replace(/{{\w+}}/g, (pair) => {
        var key = pair.replace('{{', '').replace('}}', '');
        return req.body[key];
    });
    fs.writeFileSync(
        p,
        svg2png.sync(Buffer.from(file, 'utf-8'), {
            height: 256,
            width: 256 * 5,
        })
    );
    res.send(genRes({ path: '/sm/static/' + name }));
});

router.use(
    '/static',
    express.static(path.join('src/web/static/station/imgs/'))
);

export default router;
