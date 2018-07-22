// TOOD:
// * POST /forgot-password
// * GET /logout

const router = require('express').Router();
const {createUser} = require('../services/user');
const {tokenForUser, requireSignIn} = require('../services/auth');

router.post('/login', requireSignIn, async (req, res) => {
    return res.json({token: tokenForUser(req.user)});
});

router.post('/register', async (req, res) => {
    const {email, password} = req.body;

    if (!email || !password) {
        return res.status(422).json({error: 'email and password required'});
    }

    try {
        const user = await createUser({email, password});

        return res.json({token: tokenForUser(user)});
    }
    catch (ex) {
        return res.status(500).json({message: 'Error registering user.', error: ex});
    }
});

module.exports = router;
