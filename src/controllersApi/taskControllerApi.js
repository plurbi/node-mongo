// const moment = require('moment');
const Task = require('../models/task');

const TaskController = {};


TaskController.Index = async (req, res) => {
    const tareas = {};
    tareas.done = await Task.find({ status : true,  storage: false });
    res.json(tareas);
};

TaskController.AddGet =  (req, res) => {
   
};

TaskController.AddPost = async (req, res) => {
   
};

TaskController.EditGet = async (req,res) => {
  
};

TaskController.EditPost = async (req,res) => {
   
};

TaskController.DeleteGet = async (req,res) => {
  
};
TaskController.Turn = async (req, res) => {
   
};

TaskController.Storage = async (req, res) => {
  
};


module.exports = TaskController;