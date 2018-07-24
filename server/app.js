const bodyParser = require('body-parser');
const express = require('express');
const helmet = require('helmet');
const noSlash = require('no-slash');
const path = require('path');
const urlCleaner = require('express-url-cleaner');

const apiRouter = require('./routes/v1');
const authRouter = require('./routes/auth');
const {requireAuth} = require('./services/auth');

const app = express();
const frontendAssetPath = path.join(__dirname, '..', 'dist');

app
    .use(bodyParser.json())
    .use(helmet())
    .use(urlCleaner())
    .use(noSlash())
    .get('/js', express.static(`${frontendAssetPath}/js`))
    .get('/css', express.static(`${frontendAssetPath}/css`))
    .get('/img', express.static(`${frontendAssetPath}/img`))
    .use('/api/v1', requireAuth, apiRouter)
    .use('/api', authRouter)
    .get('/*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '..', 'dist/index.html'));
    });

module.exports = app;
