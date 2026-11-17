import express from 'express';
import { getAllTodos, getTodo, addTodo, updateTodo, deleteTodo } from '../controller/TodoController.js';

const todoRouter = express.Router();

todoRouter.get('/', getAllTodos);
todoRouter.get('/:id', getTodo);
todoRouter.post('/', addTodo);
todoRouter.patch('/:id', updateTodo);
todoRouter.delete('/:id', deleteTodo);

export default todoRouter;