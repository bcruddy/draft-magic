const router = require('express').Router();
const {authCheck, AUTH_ROLES} = require('../../services/auth');
const drafts = require('./drafts');

router
    .get('/ping', (req, res) => {
        return res.send('ok');
    })
    .post(authCheck(AUTH_ROLES.user))
    .put(authCheck(AUTH_ROLES.user))
    .delete(authCheck(AUTH_ROLES.user))
    .use(drafts);

module.exports = router;
