const bcrypt = require('bcrypt');
const db = require('./db');
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
    const [user] = rows;

    return user;
};

const findUser = async ({id, email}) => {
    if (id) {
        const {rows} = await findUserById(id);
        const [user] = rows;

        return user;
    }
    if (email) {
        const {rows} = await findUserByEmail(email);
        const [user] = rows;

        return user;
    }
};

const findUserByEmail = async (email) => {
    return db.query(`
        SELECT *
        FROM users
        WHERE email = $1
    `, [email]);
};

const findUserById = async (id) => {
    return db.query(`
        SELECT *
        FROM users
        WHERE id = $1
    `, [id]);
};

module.exports = {
    createUser,
    findUser,
    findUserByEmail,
    findUserById
};
