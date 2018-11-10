const express = require('express');
const router = express.Router();
const moment = require('moment');

const Task = require('../models/task');

router.get('/', async (req,res) => {
    const pendingTasks = await Task.find({ status : false },  null, {
        skip:0, // Starting Row
        limit:10, // Ending Row
        sort:{
            creationTime: 1 //Sort by Date Added DESC
        }
    }, (err, oks) => {
        console.log('pending tasks -> err', err);
        });
    const doneTasks = await Task.find({ status : true }, null, {
        skip:0, // Starting Row
        limit:10, // Ending Row
        sort:{
            creationTime: -1 //Sort by Date Added DESC
        }
    }, (err, oks) => {
        console.log('done taks -> err', err);
    });
    res.render('index', { 
        pendingTasks, doneTasks
    });
});

router.post('/add', async (req,res) => {
    const task = new Task({
        title: req.body.title,
        description: req.body.description,
        creationTime: new Date()
    });
    await task.save()
    res.redirect('/');
});

router.get('/turn/:id', async (req,res) => {
    const { id } = req.params;
    const task = await Task.findById(id);
    task.status = !task.status;
    await task.save();
    res.redirect('/');
});

router.get('/delete/:id', async (req,res) => {
    const { id } = req.params;
    await Task.remove({ _id: id});
    res.redirect('/');
});

router.get('/edit/:id', async (req,res) => {
    const { id } = req.params;
    const task = await Task.findById({ _id: id});
    res.render('edit', {
        task
    });
});

router.post('/edit/:id', async (req,res) => {
    const { id } = req.params;
    await Task.update({ _id: id }, req.body);
    res.redirect('/');
});


module.exports = router;