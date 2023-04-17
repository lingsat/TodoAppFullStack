import { Router } from 'express';
import todoController from '../../controllers/todo.controller';
import { tryCatch } from '../../middlewares/tryCatch.middleware';
import { validator } from '../../middlewares/validator.middleware';
import { isExist } from '../../middlewares/isExist.middleware';
import { auth } from '../../middlewares/auth.middleware';
import { todoExist } from '../../services/entityExist.service';
import { createTodoSchema, updateTodoSchema } from '../../models/Todo';

const todosRouter: Router = Router();

// Get all Todos for User - own todos and not private
todosRouter.get('', auth, tryCatch(todoController.getAllTodo.bind(todoController)));

// Get Single Todo by id
todosRouter.get(
  '/one/:id',
  auth,
  isExist(todoExist),
  tryCatch(todoController.getTodoById.bind(todoController))
);

// Add Todo
todosRouter.post(
  '',
  auth,
  validator(createTodoSchema),
  tryCatch(todoController.addTodo.bind(todoController))
);

// Update Todo
todosRouter.put(
  '/:id',
  auth,
  isExist(todoExist),
  validator(updateTodoSchema),
  tryCatch(todoController.updateTodo.bind(todoController))
);

// Delete Todo
todosRouter.delete(
  '/:id',
  auth,
  isExist(todoExist),
  tryCatch(todoController.deleteTodo.bind(todoController))
);

export default todosRouter;
