const express = require('express');
const HomeRouter = express.Router();

HomeRouter.get('/', (req, res) => {
    res.render('Home/index');
});


module.exports = HomeRouter;