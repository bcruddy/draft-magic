const router = require('express').Router();
const drafts = require('./drafts');

router
    .get('/ping', (req, res) => {
        return res.send('ok');
    })
    .use(drafts);

module.exports = router;
