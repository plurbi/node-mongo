const moment = require('moment');
const Task = require('../models/task');
const states = require('../models/enums/statesEnum.js');
const TaskController = {};


TaskController.Index = async (req, res) => {
    //refactor {
    const pendingTasks = await Task.find({ storage: false, 'status.description': states[0].description }, null, {
        skip: 0, // Starting Row
        limit: 10, // Ending Row
        sort: {
            scheduleTime: 1 //Sort by Date Added DESC
        }

    }, (err, oks) => {
    });

    const progressTasks = await Task.find({ 'status.description': states[1].description, storage: false }, null, {
        skip: 0, // Starting Row
        limit: 10, // Ending Row
        sort: {
            creationTime: -1 //Sort by Date Added DESC
        }
    }, (err, oks) => {
    });

    const doneTasks = await Task.find({ storage: false, 'status.description': states[2].description }, null, {
        skip: 0, // Starting Row
        limit: 10, // Ending Row
        sort: {
            creationTime: -1 //Sort by Date Added DESC
        }
    }, (err, oks) => {
    });
    //}
    res.render('Tasks/index', {
        pendingTasks, progressTasks, doneTasks, moment
    });
};

TaskController.AddGet = (req, res) => {
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
        storage: false,
        status: {
            description: states[0].description,
            order: 1
        }
    });

    await task.save()
    res.redirect('/Tasks');
};

TaskController.EditGet = async (req, res) => {
    const { id } = req.params;
    const task = await Task.findById({ _id: id });
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

TaskController.EditPost = async (req, res) => {
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

TaskController.DeleteGet = async (req, res) => {
    const { id } = req.params;
    await Task.remove({ _id: id });
    res.redirect('/Tasks');
};

TaskController.TurnUp = async (req, res) => {
    const { id } = req.params;
    const task = await Task.findById(id);
    //turn from pending to progress
    var i = 0;
    while (i < states.length) {
        if (task.status.description == states[i].description && i < (states.length - 1)) {            
            task.status.description = states[i + 1].description;
            i = states.length;            
        }
        i++;
    }
    await task.save();
    res.redirect('/Tasks');
};
TaskController.TurnDown = async (req, res) => {
    const { id } = req.params;
    const task = await Task.findById(id);
    console.log('states', states,'task', task);
    //turn from pending to progress
    var i = 0;
    while (i < states.length) {
        console.log(task.status.description == states[i].description, task.status.description , states[i].description);
        if (task.status.description == states[i].description) {     
            console.log('if', states[i], i);       
            task.status.description = states[i - 1].description;
            i = states.length;            
        }
        i++;
    }
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