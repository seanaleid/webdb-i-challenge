const db = require('../dbConfig');

module.exports = {
    find,
};

async function find(query = {}) {
    const { limit = 5, sortby = 'id', sortdir = 'desc' } = query;

    let rows = await db('accounts')
        .orderBy(sortby, sortdir)
        .limit(limit);

    return rows;
}