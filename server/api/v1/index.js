const router = require('express').Router();

router.get('/test', (req, res) => {
    res.send('nice!');
});

module.exports = router;
