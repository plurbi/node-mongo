const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    creationTime: Date,
    scheduleTime: Date,
    updateTime: Date,
    title: String,
    description: String,
    status: {
        description: { type: String, lowercase: true, trim: true },
        order: { type: Number }
    },
    storage: {
        type: Boolean,
        dafault: false
    },
    lifeCycles: []
});

module.exports = mongoose.model('tasks', taskSchema);