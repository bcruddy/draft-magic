const router = require('express').Router();

router.get('/ping', (req, res) => {
    return res.send('ok');
});

module.exports = router;
