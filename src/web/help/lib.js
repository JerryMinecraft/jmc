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
