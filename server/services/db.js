const {Pool} = require('pg');
const {database} = require('../config');

const pool = new Pool(database);

pool.on('error', (err) => {
    console.error('Unexcepted error on idle client', err);
});

const query = async (...args) => {
    try {
        const client = await pool.connect();
        const result = await client.query(...args);

        client.release();

        return result;
    }
    catch (ex) {
        console.error('Error querying database', ex);
    }
};

module.exports = {
    pool,
    query
};
