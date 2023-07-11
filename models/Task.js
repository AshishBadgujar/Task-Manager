import mongoose, { mongo } from 'mongoose';

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

const Task = mongoose.models.Task || mongoose.model('Task', taskSchema);

export default Task;
