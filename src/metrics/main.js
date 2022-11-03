import io from '@pm2/io';

const ios = {
    counter: {
        requestCounter: io.counter({
            name: 'Total requests',
            id: 'app/requests/total',
        }),

        pcl2RequestCounter: io.counter({
            name: 'Total requests',
            id: 'app/requests/pcl2',
        }),
        whitelistRequestCounter: io.counter({
            name: 'Whitelist requests',
            id: 'app/requests/whitelist',
        }),
        userRequestCounter: io.counter({
            name: 'User requests',
            id: 'app/requests/user',
        }),
        serverRequestCounter: io.counter({
            name: 'MC server requests',
            id: 'app/requests/server',
        }),
    },
};

export let RequestTypes = {
    USER: 0,
    PCL2: 1,
    WHITELIST: 2,
    SERVER: 3,

    UNKNOWN: 4,
};

export let addRequestTotal = (type = RequestTypes.UNKNOWN) => {
    ios.counter.requestCounter.inc();
    switch (type) {
        case RequestTypes.USER:
            ios.counter.userRequestCounter.inc();
            break;

        case RequestTypes.PCL2:
            ios.counter.pcl2RequestCounter.inc();
            break;

        case RequestTypes.WHITELIST:
            ios.counter.whitelistRequestCounter.inc();
            break;

        case RequestTypes.SERVER:
            ios.counter.serverRequestCounter.inc();
            break;

        default:
            break;
    }
};
