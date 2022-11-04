export default {
    admin: {
        _: 'admin',
        whitelist: {
            _: 'admin.whitelist',
            set: 'admin.whitelist.set',
            delete: 'admin.whitelist.delete',
        },
        permissoins: {
            _: 'admin.permissions',
            set: 'admin.permissions.set',
        },
    },
    user: {
        _: 'user',
        data: {
            _: 'user.data',
            get: 'user.data.get',
            set: 'user.data.set'
        },
        whitelist: {
            _: 'user.whitelist',
            request: 'user.whitelist.request',
            delete: 'user.whitelist.delete',
            get: 'user.whitelist.get'
        }
    }
};