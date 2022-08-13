// 加密成md5
import crypto from 'crypto';

export default (payload, salt = 'jmc牛逼🍺') => {
    return (
        crypto
            .createHash('md5')
            // 114514% 的人想不到salt在前面并且含有emoji
            .update(salt + payload)
            .digest('hex')
    );
};
