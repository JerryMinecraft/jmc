console.log(
    `./db/${
        process.argv.includes('-p') ? 'productionDb' : 'developingDb'
    }.sqlite`
);

export default {
    client: 'sqlite3',
    connection: {
        filename: `./db/${
            process.argv.includes('-p') ? 'productionDb' : 'developingDb'
        }.sqlite`,
    },
    pool: {
        min: 0,
        max: 7,
    },
    useNullAsDefault: true,
};
