const db = require('../dbConfig');

module.exports = {
    find,
    getById,
    insert,
    update,
    remove
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

function insert(user) {
    return db('accounts')
    .insert(user)
    .then(ids => {
        return getById(ids[0]);
    });
}

function update(id, changes) {
    return db('accounts')
    .where({ id })
    .update(changes);
}

function remove(id) {
    return db('accounts')
      .where('id', id)
      .del();
  }
  