const {Client} = require('pg');
const {database} = require('./config');

const client = new Client(database);

client.connect();

module.exports = client;
