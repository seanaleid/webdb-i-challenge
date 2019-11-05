const db = require('../dbConfig');

module.exports = {
    find,
    getById
};

async function find(query = {}) {
    const { limit = 5, sortby = 'id', sortdir = 'desc' } = query;

    let rows = await db('accounts')
        .orderBy(sortby, sortdir)
        .limit(limit);

    return rows;
}

function getById(id) {
    return db('accounts')
      .where({ id })
      .first();
  }