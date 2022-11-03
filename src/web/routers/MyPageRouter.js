import express from 'express';

import xamlConfig from '../../config/xaml.js';

const router = express.Router();

/**
 * 使用缓存前:
 * 每ms处理 1030 个请求
 *
 * 使用缓存后:
 * 每ms处理 900 个请求
 */

/**
 * 平均响应时间: 2ms
 * min: 2ms
 * max: 3ms
 */

/**
 * @api {get} /xaml/:version 获取PCL2主页JMC自定页面
 * @apiName PCL2页面
 * @apiGroup My page
 *
 * @apiParam {String} version 版本
 *
 * @apiSuccess {String} PCL2页面内容
 */
router.get('/:version', (req, res) => {
    var current = xamlConfig[req.params.version];
    req.log.info('Getting xaml version: ' + req.params.version);
    if (current) {
        var fileData = current.getXaml();
        res.status(200).send(fileData);
    } else {
        res.send(`<TextBlock Margin="0,0,0,20" FontSize="20" Foreground="red" HorizontalAlignment="Center"
        Text="没有版本为${req.params.version}的主页!" />`);
    }
});

export default router;
