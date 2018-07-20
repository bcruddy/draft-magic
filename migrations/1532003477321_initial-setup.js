exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('users', {
        id: 'id',
        email: {
            type: 'varchar(255)',
            notNull: true,
            unique: true
        },
        password: {
            type: 'varchar(1000)',
            notNull: true
        },
        createdAt: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp')
        }
    });
};


exports.down = (pgm) => { // eslint-disable-line no-unused-vars

};
