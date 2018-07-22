const path = require('path');
const express = require('express');
const helmet = require('helmet');
const noSlash = require('no-slash');
const urlCleaner = require('express-url-cleaner');
const apiRouter = require('./api/v1');

const app = express();
const frontendAssetPath = path.join(__dirname, '..', 'dist');

app
    .use(helmet())
    .use(urlCleaner())
    .use(noSlash())
    .use('/js', express.static(`${frontendAssetPath}/js`))
    .use('/css', express.static(`${frontendAssetPath}/css`))
    .use('/img', express.static(`${frontendAssetPath}/img`))
    .use('/api/v1', apiRouter)
    .get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '..', 'dist/index.html'));
    });

module.exports = app;
