const app = require('./app');
const {port} = require('./config');

app.listen(port, () => {
    console.info(`draft-magic listening on ${port}`);
});
