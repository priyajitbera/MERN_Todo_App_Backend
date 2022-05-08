const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        userId: { type: String, required: true },
        createdDate: {
            type: Date,
            required: true,
            default: new Date(),
        },
    }
);

module.exports = mongoose.model('Todo', todoSchema);