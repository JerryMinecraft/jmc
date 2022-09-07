import io from '@pm2/io';

const ios = {
    counter: {
        requestCounter: io.counter({
            name: 'Total requests',
            id: 'app/total/requests',
        }),

        pcl2RequestCounter: io.counter({
            name: 'Total requests',
            id: 'app/total/requests',
        }),
    },
};

const RequestTypes = {
    USER: 0,
    PCL2: 1,
    WHITELIST: 2,
    SERVER: 3,

    UNKNOWN: 4,
};

export let addRequestTotal = (type = RequestTypes.UNKNOWN) => {
    ios.counter.requestCounter.inc();
    switch (type) {
        case RequestTypes.PCL2:
            ios.counter.pcl2RequestCounter.inc();
            break;

        default:
            break;
    }
};
