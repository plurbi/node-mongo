const express = require('express');
const HomeRouter = express.Router();

HomeRouter.get('/', (req, res) => {
    
});

HomeRouter.get('*', (req, res) => {
    res.send('../public/index.html');
});

module.exports = HomeRouter;