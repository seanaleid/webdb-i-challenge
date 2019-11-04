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
            res.status(500).json({ error: 'Failed to get accounts from database'})
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
            res.status(500).json({ error: 'Failed to get the account from database'})
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
            res.status(500).json({ error: 'Failed to insert the account to database'})
        })
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;

    knex('accounts')
        .where({ id: req.params.id })
        .update(changes)
        .then(count => { // how many records/rows were updated
            res.status(200).json(count);
        })
        .catch(err => {
            res.status(500).json({ error: 'Failed to update the account in database'})
        })
});

module.exports = router;