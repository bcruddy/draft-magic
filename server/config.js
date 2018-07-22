module.exports = {
    database: {
        host: process.env.DM_DB_HOST,
        database: process.env.DM_DB_NAME,
        user: process.env.DM_DB_USER,
        password: process.env.DM_DB_PASSWORD,
        port: process.env.DM_DB_PORT
    },
    jwt_secret: process.env.DM_JWT_SECRET || 'dev-secret',
    port: process.env.PORT || 4300
};
