const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    creationTime: Date,
    scheduleTime: Date,
    title: String,
    description: String,
    status: {
        type: Boolean,
        default: false
    },
    storage: {
        type: Boolean,
        dafault: false
    }
});

module.exports = mongoose.model('tasks', taskSchema);