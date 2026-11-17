import Todo from '../models/TodoModel.js';
import { addTodoSchema, updateTodoSchema } from '../validators/TodoValidation.js';

export const getAllTodos = async(req, res, next) => {
  try {
    const todos = await Todo.find({
      deletedAt: null,
    }).select(`name description status`);

    const todosObj = todos.map((todo) => {
      return todo.toObject ? todo.toObject() : todo.toJSON();
    });

    return res.json({
      status: 200,
      success: true,
      message: 'All Todos fetched',
      data: todosObj,
    })

  } catch (err) {
    console.error('Get all Todos error: ', err.message);
    next(err);
  };
};

export const getTodo = async(req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      const err = new Error('Bad request! Missing Todo Id');
      err.statusCode = 400;
      next(err);
    }

    const todo = await Todo.findById({
      _id: id,
      deletedAt: null,
    }).select(`name description status`);

    if (!todo) {
      const err = new Error('Todo not found');
      err.statusCode = 404;
      next(err);
    };

    const todoObj = todo.toObject ? todo.toObject() : todo.toJSON();

    return res.json({
      status: 200,
      success: true,
      message: 'Fetched a Todo',
      data: todoObj
    })

  } catch(err) {
    console.error('Get a Todo error: ', err.message);
    next(err);
  };
};

export const addTodo = async(req, res, next) => {
  try {
    const validatedData = await addTodoSchema.validate(
      req.body,
      {
        abortEarly: false,
        stripUnknown: true,
      }
    );

    const newTodo = await Todo.create(validatedData);

    const newTodoObj = newTodo.toObject ? newTodo.toObject() : newTodo.toJSON();
    
    const todoResponse = {
      _id: newTodoObj._id,
      name: newTodoObj.name,
      description: newTodoObj.description,
      status: newTodoObj.status,
    }

    return res.status(200).json({
      status: 200,
      success: true,
      message: `Todo created Successfully`,
      data: todoResponse,
    })

  } catch(err) {
    console.error('Add Todo error: ', err.message);
    next(err);
  };
};

export const updateTodo = async(req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      const err = new Error('Bad request! Missing Todo Id');
      err.statusCode = 400;
      next(err);
    };

    const validatedData = await updateTodoSchema.validate(
      req.body,
      {
        abortEarly: false,
        stripUnknown: true
      }
    );

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { $set: validatedData },
      { 
        returnDocument: 'after',
        runValidators: true
      } 
    );

    if (!updatedTodo) {
      const err = new Error('Todo not found');
      err.statusCode = 404;
      next(err);
    };

    const responseData = {
      _id: updatedTodo._id,
      name: updatedTodo.name,
      description: updatedTodo.description,
      status: updatedTodo.status,
    }

    return res.status(200).json({
      status: 200,
      success: false,
      message: 'Updated Todo successfully',
      data: responseData,
    });

  } catch (err) {
    console.error('Update Todo error: ', err.message);
    next(err)
  };
};

export const deleteTodo = async(req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      const err = new Error('Bad Request! Missing Id');
      err.statusCode = 400;
      next(err);
    };

    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      const err = new Error("Todo not found");
      err.statusCode = 404;
      next(err);
    };

    const responseData = {
      _id: deletedTodo._id,
      name: deletedTodo.name,
      description: deletedTodo.description,
      status: deletedTodo.status,
    }    

    return res.status(410).json({
      status: 410,
      success: true,
      message: 'Todo deleted successfully',
      data: responseData,
    });

  } catch(err) {
    console.error('Delete Todo error: ', err.message);
    next(err);
  }
};