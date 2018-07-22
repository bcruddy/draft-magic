exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('drafts', {
        id: 'id',
        isDeleted: 'boolean',
        name: {
            type: 'varchar(256)',
            default: 'Unnamed Draft'
        },
        position: {
            type: 'integer',
            notNull: true
        },
        ppr: {
            type: 'boolean',
            notNull: true,
            default: false
        },
        size: {
            type: 'integer',
            notNull: true,
            default: 10
        },
        snapshot: { // [{ timestamp: draft{} }]
            type: 'json',
            notNull: true
        },
        userId: {
            type: 'integer',
            notNull: true,
            references: '"users"',
            onDelete: 'cascade'
        }
    });

    pgm.createIndex('drafts', 'userId');
};
