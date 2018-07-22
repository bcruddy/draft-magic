const bodyParser = require('body-parser');
const express = require('express');
const helmet = require('helmet');
const noSlash = require('no-slash');
const path = require('path');
const urlCleaner = require('express-url-cleaner');

const apiRouter = require('./routes/v1');
const authRouter = require('./routes/auth');
const {requireSignIn} = require('./services/auth');

const app = express();
const frontendAssetPath = path.join(__dirname, '..', 'dist');

app
    .use(bodyParser.json())
    .use(helmet())
    .use(urlCleaner())
    .use(noSlash())
    .use('/js', express.static(`${frontendAssetPath}/js`))
    .use('/css', express.static(`${frontendAssetPath}/css`))
    .use('/img', express.static(`${frontendAssetPath}/img`))
    .use(authRouter)
    .use('/api/v1', requireSignIn, apiRouter)
    .get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '..', 'dist/index.html'));
    });

module.exports = app;
