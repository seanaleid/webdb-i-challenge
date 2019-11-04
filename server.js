const express = require('express');

const AccountRouter = require('./data/accounts/account-router.js');

const server = express();

server.use(express.json());

server.use('/api/accounts', AccountRouter);

server.get('/', (req, res) => {
    res.send('<h3>Web DB Accounts</h3>');
});

module.exports = server;