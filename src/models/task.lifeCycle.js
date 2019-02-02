const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskLifeCycleSchema = new Schema({
    stateFrom: String,
    stateTo: String,
    date: Date
});

module.exports = mongoose.model('tasksLifeCycle', taskLifeCycleSchema);