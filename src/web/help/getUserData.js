import { findUser } from '../../db/controller/user.js';
import jwt from 'json-web-token';
import { errRes } from './genRes.js';

const _jwtSecret = 'jmcNb!!!!!!!';

export default async (token) => {
    var res = {
        error: null,
        userData: {},
    };
    return new Promise((resolve) => {
        jwt.decode(_jwtSecret, token, async (err, payload) => {
            if (err) {
                res.error = err;
                resolve(res);
                return;
            }

            var userRes = await findUser('', payload.id);
            if (userRes.length == 0) {
                res.error = errRes.userNotExists;
                resolve(res);
                return;
            }

            var userData = userRes[0];
            delete userData.password;
            res.userData = userData;
            resolve(res);
        });
    });
};
