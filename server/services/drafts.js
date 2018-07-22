const db = require('/.db');

const getDrafts = async (user) => {
    const {rows: drafts} = await db.query(`
        SELECT *
        FROM drafts
        WHERE userId=$1
    `, [user.id]);

    return drafts;
};

const getDraftById = async (id) => {
    const {rows} = await db.query(`
        SELECT *
        FROM drafts
        WHERE id=$1
    `, [id]);
    const [draft] = rows;

    return draft;
};

const createDraft = async (user, draft) => {
    const {
        name,
        position,
        ppr,
        size,
        snapshot
    } = draft;

    const created = await db.query(`
        INSERT INTO drafts
        (name,position,ppr,size,snapshot,userId)
        VALUES($1,$2,$3,$4,$5,$6)
        RETURNING *
    `, [name, position, ppr, size, snapshot, user.id]);

    return created;
};

module.exports = {
    createDraft,
    getDraftById,
    getDrafts
};
