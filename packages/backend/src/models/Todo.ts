import Joi from 'joi';

export const createTodoSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  isPrivate: Joi.boolean().required(),
  userId: Joi.number().required()
});

export const updateTodoSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  isPrivate: Joi.boolean().required(),
  isComplete: Joi.boolean().required()
});
