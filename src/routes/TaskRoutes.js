const express = require('express');
const TaskRouter = express.Router();

const TaskController = require('../controllers/taskController');

TaskRouter.get('/Tasks/', TaskController.Index );
TaskRouter.get('/Tasks/add', TaskController.AddGet );
TaskRouter.post('/Tasks/add', TaskController.AddPost );
TaskRouter.get('/Tasks/turn/:id', TaskController.Turn );
TaskRouter.get('/Tasks/storage/:id', TaskController.Storage );
TaskRouter.get('/Tasks/delete/:id', TaskController.DeleteGet );
TaskRouter.get('/Tasks/edit/:id', TaskController.EditGet );
TaskRouter.post('/Tasks/edit/:id', TaskController.EditPost );


module.exports = TaskRouter;