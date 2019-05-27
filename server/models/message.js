/**
 * Mongoose Module.
 */
const mongoose = require('mongoose');

/**
 * Mongoose Schema
 */
const Schema = mongoose.Schema;

/**
 * Define Message Schema.
 */
const ModelSchema = new mongoose.Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type:String,
        required: true
    },
    seen: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    },
});

const Model = mongoose.model('Message', ModelSchema);

module.exports = Model;