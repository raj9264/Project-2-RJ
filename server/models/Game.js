// this whole file was repurposed from Domo.js
const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    hours: {
        type: Number,
        min: 0,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['Backlog', 'Dropped', 'Playing', 'Completed'],
    },
    rating: {
        type: Number,
        min: 1,
        max: 10,
        default: null,
    },
    owner: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'Account',
    },
    createdDate: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Game', GameSchema);