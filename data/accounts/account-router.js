const express = require('express');

// database access using knex
// originally named db, just a foobar, can be any name
const knex = require('../dbConfig.js');
const dbAccounts = require('./account-helper');

const router = express.Router();

// refactored code using helpers
router.get('/', (req, res) => {
    const account = req.query;
    
    dbAccounts.find(account)
        .then(accounts => {
            res.status(200).json(accounts);
        })
        .catch(err => {
            res.status(500).json({ error: 'Failed to get accounts from database'})
        })
})

// original code for today's lesson
// router.get('/', (req, res) => {
    
//     knex
//         .select('*')
//         .from('accounts')
//         .where({})
//         .then(accounts => {
//             res.status(200).json(accounts);
//         })
//         .catch(err => {
//             res.status(500).json({ error: 'Failed to get accounts from database'})
//         })
// })


// .get /:id refactor using a helper
router.get('/:id', (req, res) => {
    const {id} = req.params

    dbAccounts.getById(id)
        .then(account => {
            res.status(200).json(account);
        })
        .catch(err => {
            res.status(500).json({ error: 'Failed to get the account from database'})
        })
})

// // original code for today's assignment
// router.get('/:id', (req, res) => {
//     knex
//         .select('*')
//         .from('accounts')
//         .where('id', '=', req.params.id)
//         .first()
//         .then(account => {
//             res.status(200).json(account);
//         })
//         .catch(err => {
//             res.status(500).json({ error: 'Failed to get the account from database'})
//         })
// })

// .post / refactor using a helper
router.post('/', (req, res) => {
    const newAccount = req.body;

    dbAccounts.insert(newAccount)
        .then(account => {
            res.status(201).json(account);
        })
        .catch(err => {
            res.status(500).json({ error: 'Failed to insert the account to database'})
        })
});

// original code for today's assignment
// router.post('/', (req, res) => {

//     knex    
//         .insert(req.body, 'id') 
//         .into('accounts')
//         .then(id => {
//             res.status(201).json(id);
//         })
//         .catch(err => {
//             res.status(500).json({ error: 'Failed to insert the account to database'})
//         })
// });

// .put refactor using a helper
router.put('/:id', (req, res) => {
    const {id} = req.params;
    const changes = req.body;

    dbAccounts.update(id, changes)
        .then(count => { // how many records/rows were updated
            res.status(200).json(count);
        })
        .catch(err => {
            res.status(500).json({ error: 'Failed to update the account in database'})
        })
});

// original code for today's assignment
// router.put('/:id', (req, res) => {
//     const id = req.params.id;
//     const changes = req.body;

//     knex('accounts')
//         .where({ id: req.params.id })
//         .update(changes)
//         .then(count => { // how many records/rows were updated
//             res.status(200).json(count);
//         })
//         .catch(err => {
//             res.status(500).json({ error: 'Failed to update the account in database'})
//         })
// });

// .delete refactor using a helper
router.delete('/:id', (req, res) => {
    const {id} = req.params;


    dbAccounts.remove(id)
        .then(count => { // how many records/rows were deleted
            res.status(200).json(count);
        })
        .catch(err => {
            res.status(500).json({ error: 'Failed to delete post from database'})
        })

});

// original code from today's assignment
// router.delete('/:id', (req, res) => {
//     const changes = req.body;


//     knex('accounts')
//         .where({ id: req.params.id })
//         .del()
//         .then(count => { // how many records/rows were deleted
//             res.status(200).json(count);
//         })
//         .catch(err => {
//             res.status(500).json({ error: 'Failed to delete post from database'})
//         })

// });

module.exports = router;