const {Pool} = require('pg');
const {database} = require('../config');

const pool = new Pool(database);

pool.on('error', (err) => {
    console.error('Unexcepted error on idle client', err);
});

const query = async (...args) => {
    let client;

    try {
        client = await pool.connect();
        const result = await client.query(...args);

        return result;
    }
    catch (ex) {
        console.error('Error querying database', ex);
    }
    finally {
        client.release(); // always release the client, even when query fails
    }
};

module.exports = {
    pool,
    query
};
