const moment = require('moment');
const Task = require('../models/task');

const TaskController = {};

TaskController.Index = async (req, res) => {
    const pendingTasks = await Task.find({ status : false },  null, {
        skip:0, // Starting Row
        limit:10, // Ending Row
        sort:{
            scheduleTime: 1 //Sort by Date Added DESC
        }
    }, (err, oks) => {
        console.log('pending tasks -> err', err);
        });
    const doneTasks = await Task.find({ status : true, storage: false }, null, {
        skip:0, // Starting Row
        limit:10, // Ending Row
        sort:{
            creationTime: -1 //Sort by Date Added DESC
        }
    }, (err, oks) => {
        console.log('done taks -> err', err);
    });
    res.render('index', { 
        pendingTasks, doneTasks, moment
    });
};

TaskController.AddGet =  (req, res) => {
    const task = new Task();
    res.render('Task', {
        moment,
        task,
        action: '/add',
        method: 'POST',
        submitText: 'Ok!',
        btnClass: 'btn-info',
        formTitle: 'Agregar Tarea!'
    });
};

TaskController.AddPost = async (req, res) => {
    const task = new Task({
        title: req.body.title,
        description: req.body.description,
        scheduleTime: req.body.scheduleTime,
        creationTime: moment(new Date()).format('l'),
        storage: false
    });
    await task.save()
    res.redirect('/');
};

TaskController.EditGet = async (req,res) => {
    const { id } = req.params;
    const task = await Task.findById({ _id: id});
    res.render('Task', {
        moment,
        task,
        action: '/edit/' + id,
        method: 'POST',
        submitText: 'Editalo!',
        btnClass: 'btn-warning',
        formTitle: 'Editar Tarea!'
    });
};

TaskController.EditPost = async (req,res) => {
    const { id } = req.params;
    await Task.update({ _id: id }, req.body);
    res.redirect('/');
};

TaskController.DeleteGet = async (req,res) => {
    const { id } = req.params;
    await Task.remove({ _id: id});
    res.redirect('/');
};

TaskController.Turn = async (req, res) => {
    const { id } = req.params;
    const task = await Task.findById(id);
    task.status = !task.status;
    await task.save();
    res.redirect('/');
};

TaskController.Storage = async (req, res) => {
    const { id } = req.params;
    const task = await Task.findById(id);
    task.storage = true;
    await task.save();
    res.redirect('/');
};


module.exports = TaskController;