import MyPageRouter from './routers/MyPageRouter.js';
import UserRouter from './routers/UsersRouter.js';
import WhitelistRouter from './routers/WhitelistRouter.js';
import McServerRouter from './routers/McServerRouter.js';
import StationMakerRouter from './routers/StationMakerRouter.js';
import AdminRouter from './routers/admin/AdminMainRouter.js';

/**
 * 初始化所有路由
 */

export default (app) => {
    app.use('/xaml', MyPageRouter);
    app.use('/users', UserRouter);
    app.use('/whitelist', WhitelistRouter);
    app.use('/mcserver', McServerRouter);
    app.use('/sm', StationMakerRouter);
    app.use('/admin', AdminRouter);
};
