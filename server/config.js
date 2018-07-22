module.exports = {
    server: {
        port: process.env.PORT || 4300
    },
    database: {
        host: process.env.DM_DB_HOST,
        database: process.env.DM_DB_NAME,
        user: process.env.DM_DB_USER,
        password: process.env.DM_DB_PASSWORD,
        port: process.env.DM_DB_PORT
    }
};
