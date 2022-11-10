export let getCurrentTimestamp = () => {
    return new Date().getTime();
};

export let getRandomHash = (hashLength = 16) => {
    var text =
        '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(
            ''
        );
    var hash = '';
    for (let i = 0; i < hashLength; i++)
        hash += text[Math.floor(Math.random() * hashLength)];
    return hash;
};

export let getAllObjectStringValue = (obj) => {
    var v = [];
    for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
            const value = obj[key];
            if (typeof value == 'string') {
                v.push(value);
            } else {
                v.push(...getAllObjectStringValue(value));
            }
        }
    }
    return v;
};
