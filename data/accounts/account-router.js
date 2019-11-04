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
        .where('id', '=', req.params.id)
        .first()
        .then(account => {
            res.status(200).json(account);
        })
        .catch(err => {
            res.status(500).json({ error: 'Failed to get posts from database'})
        })
})

router.post('/', (req, res) => {

    knex    
        .insert(req.body, 'id') 
        .into('accounts')
        .then(id => {
            res.status(201).json(id);
        })
        .catch(err => {
            res.status(500).json({ error: 'Failed to insert post to database'})
        })
});

module.exports = router;