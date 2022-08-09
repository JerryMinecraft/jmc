import path from 'path';
import lodash from 'lodash';
import fs from 'fs';

class Xaml {
    constructor(version, options, eggs = []) {
        this.version = version;
        this.options = { ...options, egg: '' };
        Object.defineProperty(this.options, 'egg', {
            get() {
                return eggs[lodash.random(0, eggs.length - 1)];
            },
        });
        this.path = path.join('./src/web/static/xaml', version + '.xaml');
    }
    getXaml(params = {}) {
        var xaml = fs.readFileSync(this.path).toString();

        var p = {
            ...params,
            ...this.options,
        };
        for (const k in p) {
            if (Object.hasOwnProperty.call(p, k)) {
                const e = p[k];
                // map[`_${lodash.toUpper(k)}_`] = e;
                xaml = xaml.replace(`{{_${lodash.toUpper(k)}_}}`, e);
            }
        }

        return xaml;
    }
}

var xamlConfigs = {};

xamlConfigs['0.0.1'] = new Xaml(
    '0.0.1',
    {
        version: '0.0.1 beta',
    },
    ['OVO啥也没有（）', '114514', 'yeeeeeeee']
);

export default xamlConfigs;
