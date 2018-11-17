// const moment = require('moment');
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
        console.log('pending tasks -> err', oks);
        });
    const doneTasks = await Task.find({ status : true, storage: false }, null, {
        skip:0, // Starting Row
        limit:10, // Ending Row
        sort:{
            creationTime: -1 //Sort by Date Added DESC
        }
    }, (err, oks) => {
        console.log('done taks -> err', oks);
    });
    res.render('Tasks/index', { 
        pendingTasks, doneTasks, moment
    });
};

TaskController.AddGet =  (req, res) => {
    const task = new Task();
    res.render('Tasks/Task', {
        moment,
        task,
        action: '/Tasks/add',
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
        scheduleTime: moment(req.body.scheduleTime).format('l'),
        creationTime: moment(new Date()).format('l'),
        updateTime: moment(new Date()).format('l'),
        storage: false
    });

    await task.save()
    res.redirect('/Tasks');
};

TaskController.EditGet = async (req,res) => {
    const { id } = req.params;
    const task = await Task.findById({ _id: id});
    res.render('Tasks/Task', {
        moment,
        task,
        action: '/Tasks/edit/' + id,
        method: 'POST',
        submitText: 'Editalo!',
        btnClass: 'btn-warning',
        formTitle: 'Editar Tarea!'
    });
};

TaskController.EditPost = async (req,res) => {
    const { id } = req.params;
    const task = {

        title: req.body.title,
        description: req.body.description,
        scheduleTime: moment(req.body.scheduleTime).format('l'),
        creationTime: moment(req.body.creationTime).format('l'),
        updateTime: moment(new Date()).format('l'),
        storage: false
    };
    await Task.update({ _id: id }, task);
    res.redirect('/Tasks');
};

TaskController.DeleteGet = async (req,res) => {
    const { id } = req.params;
    await Task.remove({ _id: id});
    res.redirect('/Tasks');
};

TaskController.Turn = async (req, res) => {
    const { id } = req.params;
    const task = await Task.findById(id);
    task.status = !task.status;
    await task.save();
    res.redirect('/Tasks');
};

TaskController.Storage = async (req, res) => {
    const { id } = req.params;
    const task = await Task.findById(id);
    task.storage = true;
    await task.save();
    res.redirect('/Tasks');
};


module.exports = TaskController;