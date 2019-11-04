const express = require('express');

// database access using knex
// originally named db, just a foobar, can be any name
const knex = require('../dbConfig.js');

const router = express.Router();

router.get('/', (req, res) => {
    knex
        .select('*')
        .from('accounts')
        .then(accounts => {
            res.status(200).json(accounts);
        })
        .catch(err => {
            res.status(500).json({ error: 'Failed to get posts from database'})
        })
})

router.get('/:id', (req, res) => {
    knex
        .select('*')
        .from('accounts')
        .then(accounts => {
            res.status(200).json(accounts);
        })
        .catch(err => {
            res.status(500).json({ error: 'Failed to get posts from database'})
        })
})

module.exports = router;