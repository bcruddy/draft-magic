const app = require('./app');
const {server: {port}} = require('./config');

app.listen(port, () => {
    console.info(`draft-magic listening on ${port}`);
});
