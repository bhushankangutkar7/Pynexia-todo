import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['Pending', 'In-process', 'Completed'],
    default: 'Pending'
  },
  createdAt: {
    type: Date,
    default: Date.NOW
  },
  deletedAt: {
    type: Date,
    default: null
  }
});

const Todo = new mongoose.model('Todo', TodoSchema);

export default Todo;