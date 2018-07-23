const router = require('express').Router();
const {
    createDraft,
    getDraftById,
    getDrafts
} = require('../../services/drafts');

router.get('/drafts', async (req, res) => {
    try {
        const drafts = await getDrafts(req.user);

        return res.json({
            drafts,
            timestamp: Date.now()
        });
    }
    catch (ex) {
        return res.status(500).send('error');
    }
});

router.get('/draft/:id', async (req, res) => {
    try {
        const draft = await getDraftById(req.user, req.params.id);

        return res.json({
            draft,
            timestamp: Date.now()
        });
    }
    catch (ex) {
        return res.status(500).send('error');
    }
});

router.post('/draft', async (req, res) => {
    try {
        const draft = await createDraft(req.user, req.body);

        return res.json({
            draft,
            timestamp: Date.now()
        });
    }
    catch (ex) {
        return res.status(500).send('error');
    }
});

// router.put('/draft/:id', async (req, res) => {});

// router.delete('/draft/:id', async (req, res) => {});

module.exports = router;
