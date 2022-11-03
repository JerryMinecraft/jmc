import express from 'express';

import fs from 'fs-extra';
import path from 'path';
import svg2png from 'svg2png';

import genRes from '../help/genRes.js';

const router = express.Router();

/**
 * @api {get} /sm 获取station maker状态
 * @apiName 状态
 * @apiGroup Station maker
 *
 * @apiSuccess {String} ok为可用
 */
router.get('/', (req, res) => {
    res.send('stopped');
});

/**
 * @api {post} /sm/t 创建站牌
 * @apiName 站牌创建
 * @apiGroup Station maker
 *
 * @apiBody {String} current_line 目前线路
 * @apiBody {String} current_station 目前站台
 * @apiBody {String} next_station 下一站站台
 * @apiBody {String} stroke_color 目前线路线条颜色
 * @apiBody {String} change_line 换乘线路
 * @apiBody {String} change_line_color 换乘线路线条颜色
 *
 * @apiSuccess {String} path 生成的站牌图片路径
 * @apiError BodyError 不完整的请求体
 */
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

/**
 * @api {get} /sm/static 获取生成的图片
 * @apiName 图片获取
 * @apiGroup Station maker
 *
 * @apiSuccess {String} data 存储内容
 * @apiError 404NotFound 不存在的内容
 */
router.use(
    '/static',
    express.static(path.join('src/web/static/station/imgs/'))
);

export default router;
