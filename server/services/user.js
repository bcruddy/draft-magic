const bcrypt = require('bcrypt');
const db = require('../db');
const saltRounds = 12;

const createUser = async ({email, password}) => {
    const existingUser = await findUser({email});

    if (existingUser) {
        throw new Error(`account already exists for ${email}`);
    }

    const hash = await bcrypt.hash(password, saltRounds);
    const {rows} = await db.query(`
        INSERT INTO users
        (email, password)
        VALUES($1, $2)
        RETURNING *
    `, [email, hash]);

    return rows[0];
};

const findUser = async ({id, email}) => {
    if (id) {
        const {rows} = await this.findUserById(id);

        return rows[0];
    }
    if (email) {
        const {rows} = await this.findUserByEmail(email);

        return rows[0];
    }
};

const findUserByEmail = async (email) => {
    return db.oneOrNone(`
        SELECT *
        FROM users
        WHERE email=$1
    `, [email]);
};

const findUserById = async (id) => {
    return db.oneOrNone(`
        SELECT *
        FROM users
        WHERE id=$1
    `, [id]);
};

module.exports = {
    createUser,
    findUser,
    findUserByEmail,
    findUserById
};
